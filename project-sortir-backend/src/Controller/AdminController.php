<?php

namespace App\Controller;

use App\Entity\Participant;
use App\Entity\Ville;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CampusRepository;
use phpDocumentor\Reflection\Types\Integer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends AbstractController
{

    #[Route('/admin/villes', name: 'get_all_villes_admin')]
    public function getAllVilles(VilleRepository $villeRepository): Response
    {
        try{
            $villes = $villeRepository->findAll();
            $villesData = [];

            foreach($villes as $ville){
                $villeData = [
                    'id'=> $ville->getId(),
                    'nom'=> $ville->getNom(),
                ];

                $villesData[] = $villeData;
            }
            return $this->json(['villes' =>  $villesData]);

        }catch(\Exception $e){
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => 'Une erreur serveur est survenue.']), 500, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/admin/add-city', name: 'add_city_admin')]
    public function addCity(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['nomVille']) || empty($data['codePostal'])) {
            return $this->json(['error' => 'Le nom de la ville et son code postal sont requis'], Response::HTTP_BAD_REQUEST);
        }

        $nomVille = $data['nomVille'];
        $codePostal = $data['codePostal'];


        try {
            $ville = new Ville();
            $ville ->setNom($nomVille);
            $ville -> setCodePostal($codePostal);


            $entityManager->persist($ville);
            $entityManager->flush();

            return $this->json(['message' => 'Ville créée avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/admin/delete-city', name: 'delete_city_admin')]
    public function deleteCity(Request $request, EntityManagerInterface $entityManager, VilleRepository $villeRepository): Response
    {

        $data = json_decode($request->getContent(), true);

        if (empty($data['idVille'])) {
            return $this->json(['error' => 'Veuillez sélectionner une ville'], Response::HTTP_BAD_REQUEST);
        }

        $idVille = $data['idVille'];
        $ville = $villeRepository->find($idVille);
        try{
            $entityManager->remove($ville);
            $entityManager->flush();

            return $this->json(['message' => 'Ville supprimée avec succès'], Response::HTTP_CREATED);
        }catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
        }

    }


    #[Route('/admin/add-user', name: 'add_user_admin')]
    public function addUser(Request $request, EntityManagerInterface $entityManager, CampusRepository $campusRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password']) || empty($data['idCampus']) || !filter_var($data['idCampus'], FILTER_VALIDATE_INT)) {
            return $this->json(['error' => 'Mail, mot de passe et campus requis'], Response::HTTP_BAD_REQUEST);
        }

        $mail = $data['email'];
        $password = $data['password'];
        $idCampus = $data['idCampus'];
        $campus = $campusRepository->find($idCampus);



        try {
            $participant = new Participant();
            $participant = new Participant();
            $participant->setMail($mail);
            $participant->setMotPasse($password);
            $participant->setCampus($campus);
            $participant->setIsAdmin(false);
            $participant->setIsActiv(true);

            $entityManager->persist($participant);
            $entityManager->flush();

            return $this->json(['message' => 'Utilisateur crée avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
        }
    }


    #[Route('/admin/create/participant', name: 'create_participant', methods: ['POST', 'GET'])]
    public function createParticipant(Request $request,CampusRepository $campusRepository, EntityManagerInterface $objectManager): Response
    {
        try {
            // Obtenir les paramètres de la requête
            $data = json_decode($request->getContent(), true);

            // Récupérer les champs de l'objet de la sortie
            $mailData = $data['mail'];
            $passwordData = $data['password'];
            $campusData = $data['campusNom'];

            $campus = $campusRepository->findOneBy(['nom'=>$campusData]);

            $participant = new Participant();
            $participant->setMail($mailData);
            $participant->setMotPasse($passwordData);
            $participant->setIsAdmin(false);
            $participant->setIsActiv(true);
            $participant->setCampus($campus);

            $objectManager->persist($participant);
            $objectManager->flush();
            return new Response(json_encode(['message' =>'Participant créé']), 200, ['Content-Type' => 'application/json']);
        } catch (\Throwable $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 500, ['Content-Type' => 'application/json']);
        }
    }
}
