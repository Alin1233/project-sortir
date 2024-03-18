<?php

namespace App\Controller;

use ApiPlatform\Metadata\Tests\Fixtures\Metadata\Get;
use App\Entity\Lieu;
use App\Entity\Participant;
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

    #[Route('/getallbyfilter', name: 'get_all_sorties', methods: "GET")]
    public function getAllSortiesByFilter(SortieRepository $sortieRepository, Request $request, ParticipantRepository $participantRepository): Response
    {
        try{
            $filters = json_decode($_GET['filter']);
            $userId = json_decode($_GET['userId']);
            $participant = $participantRepository->find($userId);
            $filteredSorties = [];

            if(empty($filters)){
                $inscritSorties = $participant->getSortie();
                $filteredSorties = array_merge($filteredSorties, $inscritSorties->toArray());
            }else {
                foreach($filters as $filter){
                    if($filter === 'inscrit'){
                        $inscritSorties = $participant->getSortie();
                        if($inscritSorties){
                            $filteredSorties = array_merge($filteredSorties, $inscritSorties->toArray());
                        }
                    }
                    if($filter === 'organisateur'){
                        $organisateurSorties = $participant->getSortiesOrganisees();
                        if($organisateurSorties){
                            $filteredSorties = array_merge($filteredSorties, $organisateurSorties->toArray());
                        }
                    }
                    if($filter === 'nonInscrit'){
                        $nonInscritSorties = $sortieRepository->findSortiesWhereUserNotInscrit($userId);
                        if($nonInscritSorties){
                            $filteredSorties = array_merge($filteredSorties, $nonInscritSorties);
                        }
                    }
                    if($filter === 'passee'){
                        $sortiesPasse = $sortieRepository->findRecentSortiesWithEtatPassee();
                        if($sortiesPasse){
                            $filteredSorties = array_merge($filteredSorties, $sortiesPasse);
                        }
                    }
                }
            }
            $filteredSorties = array_unique($filteredSorties, SORT_REGULAR);

            #$sorties = $sortieRepository -> findAll();
            #$sorties = $participant->getSortie();
            $sortiesData = [];
            foreach ($filteredSorties as $sortie) {
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
                    'organisateur' =>[  
                        'nom' => $sortie->getOrganisateur()->getNom(),
                        'id' =>$sortie->getOrganisateur()->getId(),
                    ],
                    'nbInscriptionMax'=> $sortie->getNbInscriptionMax(),
                    'participants'=> $participantsData,
                    'campus'=> $sortie->getCampus()->getNom()
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
    public function getSortie(int $id, SerializerInterface $serializer, EntityManagerInterface $entityManager, SortieRepository $sortieRepository): Response
    {
        try {
            $sortie = $sortieRepository->find($id);


            if (!$sortie) {
                return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
            }

            $data = $serializer->serialize($sortie, 'json');

            return new Response($data, 200, ['Content-Type' => 'application/json']);
        } catch (\Exception $e) {
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => $e->getMessage()]), 500, ['Content-Type' => 'application/json']);
        }
        //Virer try catch, dans react voir status de l'erreur, pop up sur react , ouvrez console -> network requete en rouge , details de l'erreur
        //plus propre handler dans symfony toute les réponse donne du json
    }
    #[Route('/sedesister/{sortieId}/{participantId}', name: 'se_desister')]
    public function seDesister(EntityManagerInterface $entityManager, SortieRepository $sortieRepository, ParticipantRepository $participantRepository, $sortieId, $participantId): Response
    {
        try {
            $sortie = $sortieRepository->find($sortieId);
            $participant = $participantRepository->find($participantId);

            $sortie->removeParticipant($participant);
            $entityManager->flush();
            
            return new Response("Participation annulée");
        } catch (\Exception $e) {
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => $e->getMessage()]), 500, ['Content-Type' => 'application/json']);
        }
        
    }
}
