<?php

namespace App\Controller;

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
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

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
            $dateHeureDebut = \DateTime::createFromFormat('Y-m-d', $dateHeureDebutString);
            $dateLimiteInscription = \DateTime::createFromFormat('Y-m-d', $dateLimiteInscriptionString);

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
    public function getAllSorties(SortieRepository $sortieRepository, EntityManagerInterface $entityManager, CampusRepository $campusRepository): Response
    {
        try{
            $sorties = $sortieRepository -> findAll();
            return $this->json(['sorties' =>  $sorties]);
        } 
        catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 400, ['Content-Type' => 'application/json']);
         }
    }
}
