<?php

namespace App\Controller;

use ApiPlatform\Metadata\Tests\Fixtures\Metadata\Get;
use App\Entity\Lieu;
use App\Entity\Sortie;
use App\Entity\Ville;
use App\Repository\CampusRepository;
use App\Repository\EtatRepository;
use App\Repository\LieuRepository;
use App\Repository\ParticipantRepository;
use App\Repository\SortieRepository;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use http\Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SortieController extends AbstractController
{
    #[Route('/creer', name: 'app_sortie')]
    public function index(Request $request, SortieRepository $sortieRepository, EtatRepository $etatRepository, LieuRepository $lieuRepository, VilleRepository $villeRepository, ParticipantRepository $participantRepository, CampusRepository $campusRepository, EntityManagerInterface $objectManager): Response
    {   
        
        try {

            // Obtenir les paramètres de la requête
            $data = json_decode($request->getContent(), true);

            // Récupérer les champs de l'objet de la sortie
            $nom = $data['nom'];
            $duree = $data['duree'];
            $nbInscriptionMax = $data['nbInscriptionMax'];
            $infosSortie = $data['infosSortie'];
            $etat = $data['etat'];
            $nomLieu = $data['nomLieu'];
            $rue = $data['rue'];
            $codePostal = $data['codePostal'];
            $latitude = $data['latitude'];
            $longitude = $data['longitude'];
            $organisateur = $data['organisateur']; // This will be an array representing the user object
            $campusNom = $data['campus'];
            $dateHeureDebutString = $data['dateHeureDebut'];
            $dateLimiteInscriptionString = $data['dateLimiteInscription'];
            $nomVille = $data['ville'];

            //cast to correct format
            $dateHeureDebut = \DateTime::createFromFormat('Y-m-d\TH:i', $dateHeureDebutString);
            $dateLimiteInscription = \DateTime::createFromFormat('Y-m-d\TH:i', $dateLimiteInscriptionString);

            $sortie = new Sortie();
            $sortie -> setNom($nom);
            $sortie -> setDateHeureDebut($dateHeureDebut);
            $sortie -> setDuree($duree);
            $sortie -> setDateLimiteInscription($dateLimiteInscription);
            $sortie -> setNbInscriptionMax($nbInscriptionMax);
            $sortie -> setInfosSortie($infosSortie);

            //trouver le bon état dans la db en recherchant le libelle et en définissant l'état de la sortie comme étant celui de la db.
            $etat = $etatRepository->findOneBy(['libelle' => $etat]);
            $sortie -> setEtat($etat);

            /*  pour le lieu, il faut d'abord vérifier si le lieu existe
                déjà dans la base de données, s'il existe, utiliser
                le lieu sans en créer un nouveau, s'il n'existe pas,
                créer le lieu et l'utiliser.
            */
            $lieu = $lieuRepository->findOneBy(['nom' => $nomLieu]);
            if($lieu){
                $sortie -> setLieu($lieu);
            }else{
                $newLieu = new Lieu();
                $newLieu -> setNom($nomLieu);
                $newLieu -> setRue($rue);
                $newLieu -> setLatitude($latitude);
                $newLieu -> setLongitude($longitude);

                //vérifier si la ville existe par son nom si elle existe l'utiliser sinon en créer une nouvelle
                $ville = $villeRepository->findOneBy(['nom' => $nomVille]);
                if($ville){
                    $newLieu -> setVille($ville);
                }else{
                    $newVille = new Ville();
                    $newVille -> setNom($nomVille);
                    $newVille -> setCodePostal($codePostal);

                    $objectManager -> persist($newVille);
                    $newLieu -> setVille($newVille);
                }
                $objectManager -> persist($newLieu);
                $sortie -> setLieu($newLieu);
            }
            //trouver l'objet participant à partir de l'identifiant de l'organisateur
            $id = $organisateur['id'];
            $participant = $participantRepository->find($id);
            $sortie -> setOrganisateur($participant);
            //trouver l'objet campus à partir du nom du campus
            $campus = $campusRepository->findOneBy(['nom' => $campusNom]);
            $sortie -> setCampus($campus);

            $objectManager -> persist($sortie);
            $objectManager -> flush();
            return new Response();

        } catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 400, ['Content-Type' => 'application/json']);
        }
       
    }

    #[Route('/getall', name: 'get_all_sorties', methods: "GET")]
    public function getAllSorties(SortieRepository $sortieRepository): Response
    {
        try{
            $sorties = $sortieRepository -> findAll();
            $sortiesData = [];
            foreach ($sorties as $sortie) {
                $participants = $sortie->getParticipants();
                $participantsData = [];
                foreach($participants as $participant){
                    $participantData = $participant->getId();
                
                    $participantsData[] = $participantData;
                }
                $sortieData = [
                    'id' => $sortie->getId(),
                    'nom'=> $sortie->getNom(),
                    'dateHeureDebut'=> $sortie->getDateHeureDebut(),
                    'dateLimiteInscription' => $sortie->getDateLimiteInscription(),
                    'etat' => $sortie->getEtat()->getLibelle(),
                    'organisateur' =>  $sortie->getOrganisateur()->getNom(),
                    'nbInscriptionMax'=> $sortie->getNbInscriptionMax(),
                    'participants'=> $participantsData,
                    'campus'=> $sortie->getCampus()->getNom(),
                ];

                $sortiesData[] = $sortieData;
             
            }
           
            return $this->json(['sorties' =>  $sortiesData]);
        } 
        catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 400, ['Content-Type' => 'application/json']);
         }
    }
    #[Route('/participate', name: 'participate', methods: "POST")]
    public function addParticipantToSortie(SortieRepository $sortieRepository, Request $request, ParticipantRepository $participantRepository, EntityManagerInterface $manager): Response
    {
        try{

            // Obtenir les paramètres de la requête
            $data = json_decode($request->getContent(), true);

            // Récupérer les champs de l'objet
            $idSortie = $data['idSortie'];
            // Récupérer les champs de l'objet
            $idParticipant = $data['idParticipant'];

            $participant = $participantRepository->find($idParticipant);
            $sortie = $sortieRepository->find($idSortie);

            if (!$participant || !$sortie) {
                throw $this->createNotFoundException('No participant/sortie found for id '.$idParticipant.'/'. $idSortie);
            }

            $sortie->addParticipant($participant);

            $manager->persist($sortie);
            $manager->flush();
            return new Response('Added participant '. $idParticipant.' to sortie '. $idSortie);
        } 
        catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 400, ['Content-Type' => 'application/json']);
         }
    }


    #[Route('/details/{id}', name: 'details_sortie')]
    public function getSortie(int $id, SerializerInterface $serializer, EntityManagerInterface $entityManager, SortieRepository $sortieRepository, LieuRepository $lieuRepository): Response
    {
        try {
            $sortie = $sortieRepository->find($id);

            if (!$sortie) {
                return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
            }


            $data = [
                'id' => $sortie->getId(),
                'nom'=> $sortie->getNom(),
                'dateHeureDebut'=> $sortie->getDateHeureDebut(),
                'dateLimiteInscription' => $sortie->getDateLimiteInscription(),
                'duree' => $sortie->getDuree(),
                'etat' => $sortie->getEtat()->getLibelle(),
                'description' => $sortie->getInfosSortie(),
                'organisateur' =>[
                    'nom' => $sortie->getOrganisateur()->getNom(),
                    'id' =>$sortie->getOrganisateur()->getId(),
                ],
                'nbInscriptionMax'=> $sortie->getNbInscriptionMax(),
                'participants'=> $sortie->getParticipants(),
                'campus'=> $sortie->getCampus()->getNom(),
                'ville' => $sortie->getLieu()->getVille()->getNom(),
                'codePostal' => $sortie->getLieu()->getVille()->getCodePostal(),
                'lieu' => $sortie->getLieu()->getNom(),
                'rue' => $sortie->getLieu()->getRue(),
                'longitude' => $sortie->getLieu()->getLongitude(),
                'latitude' => $sortie->getLieu()->getLatitude(),
            ];

            return $this->json(['sorties' =>  $data]);
        } catch (\Exception $e) {
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => $e->getMessage()]), 500, ['Content-Type' => 'application/json']);
        }
        //Virer try catch, dans react voir status de l'erreur, pop up sur react , ouvrez console -> network requete en rouge , details de l'erreur
        //plus propre handler dans symfony toute les réponse donne du json
    }

    #[Route('/annuler/{id}',name: 'app_annulation')]
    public function annulerSortie(int $id, SortieRepository $sortieRepository,EtatRepository $etatRepository,EntityManagerInterface $entityManager, Request $request): \Symfony\Component\HttpFoundation\JsonResponse|Response
    {
        $data = json_decode($request->getContent(), true);
        $motif = $data['motif'];

        $sortie = $sortieRepository->findOneBy(['id'=>$id]);

        if (!$sortie){
            return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $etat = $etatRepository->findOneBy(['id'=>6]);

        if (!$etat){
            return $this->json(['message' => 'Etat non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        $sortie->setEtat($etat);
        $sortie->setInfosSortie('Annulée pour cause de : '.$motif);
        $entityManager->flush();
        return new Response();
    }

    #[Route('/getDetails/{id}', name: 'app_get_details')]
    public function getSortieDetails(int $id,SortieRepository $sortieRepository, LieuRepository $lieuRepository, VilleRepository $villeRepository, CampusRepository $campusRepository): \Symfony\Component\HttpFoundation\JsonResponse
    {

        $sortie = $sortieRepository->findOneBy(['id'=>$id]);

        if (!$sortie){
            return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $sortieNom = $sortie->getNom();
        $sortieDate=$sortie->getDateHeureDebut();
        $sortieCampusId=$sortie->getCampus();
        $sortieLieu=$sortie->getLieu();

        $campus = $campusRepository->findOneBy(['id'=>$sortieCampusId]);

        if (!$campus){
            return $this->json(['message' => 'Campus non trouvée.'], Response::HTTP_NOT_FOUND);
        }
        $campusNom = $campus->getNom();

        $lieu=$lieuRepository->findOneBy(['id'=>$sortieLieu]);

        if (!$lieu){
            return $this->json(['message' => 'Lieu non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $lieuNom=$lieu->getNom();
        $lieuRue=$lieu->getRue();
        $villeId=$lieu->getVille();

        $ville = $villeRepository->findOneBy(['id'=>$villeId]);

        if (!$ville){
            return $this->json(['message' => 'Ville non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $villeNom=$ville->getNom();
        $villeCodePostal=$ville->getCodePostal();

        $responseDetails= [
            'sortieNom'=>$sortieNom,
            'sortieDate'=>$sortieDate,
            'lieuNom'=>$lieuNom,
            'lieuRue'=>$lieuRue,
            'villeNom'=>$villeNom,
            'villeCodePostal'=>$villeCodePostal,
            'campusNom'=>$campusNom
            ];

        return $this->json(['details'=>$responseDetails]);
    }

    #[Route('/supprimer/${id}', name: 'app_supprimer_sortie')]
    public function supprimerSortie(int $id, SortieRepository $sortieRepository, EntityManagerInterface $entityManager): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $sortieASupprimer = $sortieRepository->findOneBy(['id'=>$id]);

        if (!$sortieASupprimer){
            return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($sortieASupprimer);

        $entityManager->flush();

        return $this->json(['message'=> 'Vous avez bien supprimer votre sortie']);


    }

    #[Route('/modifier/{id}', name: 'app_supprimer_sortie')]
    public function modifierSortie(Request $request, int $id, SortieRepository $sortieRepository,EntityManagerInterface $entityManager, LieuRepository $lieuRepository){

        $sortie = json_decode($request->getContent(), true);

        $sortieAModifier = $sortieRepository->findOneBy(['id'=>$sortie['id']]);

        if (!$sortieAModifier){
            return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $sortieAModifier->setNom($sortie['nom']);
        $sortieAModifier->setDateHeureDebut($sortie['dateHeureDebut']);
        $sortieAModifier->setDateLimiteInscription($sortie['dateLimiteInscription']);
        $sortieAModifier->setNbInscriptionMax($sortie['nbInscriptionMax']);
        $sortieAModifier->setDuree($sortie['duree']);
        $sortieAModifier->setInfosSortie($sortie['infosSortie']);
        $sortieAModifier->setEtat($sortie['etat']);

        $lieu = $lieuRepository->findOneBy(['nom'=>$sortie['nomLieu']]);
        if (!$lieu){
            return $this->json(['message' => 'Lieu non trouvée.'], Response::HTTP_NOT_FOUND);
        }
        $lieuAModifier = $lieu -> getId();
        $sortieAModifier->setLieu($lieuAModifier);

        $entityManager->flush();

        return $this->json(['message'=> 'Vous avez bien modifier votre sortie']);


    }
}
