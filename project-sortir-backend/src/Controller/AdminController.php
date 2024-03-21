<?php

namespace App\Controller;

use App\Entity\Lieu;
use App\Entity\Participant;
use App\Entity\Ville;
use App\Repository\EtatRepository;
use App\Repository\LieuRepository;
use App\Repository\ParticipantRepository;
use App\Repository\SortieRepository;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CampusRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class AdminController extends AbstractController
{

    #[Route('/admin/villes', name: 'get_all_villes_admin')]
    public function getAllVilles(VilleRepository $villeRepository): Response
    {
        try{
            $villes = $villeRepository->findAll();
            $villesData = [];

            foreach($villes as $ville){
                $lieux = $ville->getLieux();
                $lieuxData=[];
                foreach($lieux as $lieu){
                    $lieuData = [
                        'id'=> $lieu->getId(),
                        'nom'=> $lieu->getNom(),
                        'rue'=> $lieu->getRue(),
                        'latitude'=>$lieu->getLatitude(),
                        'longitude'=>$lieu->getLongitude()
                    ];
                    $lieuxData[] = $lieuData;
                }
                $villeData = [
                    'id'=> $ville->getId(),
                    'nom'=> $ville->getNom(),
                    'codePostal'=> $ville->getCodePostal(),
                    'lieux' => $lieuxData,
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


    #[Route('/admin/delete-lieu', name: 'delete_lieu_admin')]
    public function deleteLieu(Request $request, EntityManagerInterface $entityManager, LieuRepository $lieuRepository): Response
    {

        $data = json_decode($request->getContent(), true);

        if (empty($data['idLieu'])) {
            return $this->json(['error' => 'Veuillez sélectionner un lieu'], Response::HTTP_BAD_REQUEST);
        }

        $idLieu = $data['idLieu'];
        $lieu = $lieuRepository->find($idLieu);

        try{
            $entityManager->remove($lieu);
            $entityManager->flush();

            return $this->json(['message' => 'Lieu supprimé avec succès'], Response::HTTP_CREATED);
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

    #[Route('/admin/add-lieu', name: 'add_lieu_admin')]
    public function addLieu(Request $request, EntityManagerInterface $entityManager, VilleRepository $villeRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['idVille']) || empty($data['nomLieu']) || empty($data['rueLieu']) || empty($data['latitudeLieu']) || empty($data['longitudeLieu'])) {
            return $this->json(['error' => 'Veuillez renseigner tous les champs'], Response::HTTP_BAD_REQUEST);
        }


        try {

            $lieu = new Lieu();
            $idVille = $data['idVille'];
            $ville = $villeRepository ->find($idVille);
            $nomLieu = $data['nomLieu'];
            $rueLieu = $data['rueLieu'];
            $latitudeLieu = $data['latitudeLieu'];
            $longitudeLieu = $data['longitudeLieu'];

            $lieu->setVille($ville);
            $lieu->setNom($nomLieu);
            $lieu->setRue($rueLieu);
            $lieu->setLatitude($latitudeLieu);
            $lieu->setLongitude($longitudeLieu);

            $entityManager->persist($lieu);
            $entityManager->flush();

            return $this->json(['message' => 'Lieu crée avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/admin/get-lieu-by-ville', name: 'get_lieu_by_ville_admin')]
    public function getLieuByVille(Request $request, EntityManagerInterface $entityManager, LieuRepository $lieuRepository, VilleRepository $villeRepository): Response
    {
        $data = json_decode($request->getContent(), true);
       // $idVille = $data['idVille'];
        $idVille = 95;
        $lieu = $lieuRepository->findAll();
        $ville = $villeRepository->findAll();
        dump($ville);
        try {
            $lieu = $lieuRepository->findBy(['ville_id' => $idVille]);
            dump($lieu);
            foreach ($lieu as $lieux){

//                $lieuxData[
//                        'id'=> $lieu->getId(),
//                        'nom'=> $lieu->getNom(),
//                        'rue'=> $lieu->getRue(),
//                        'latitude'=>$lieu->getLatitude(),
//                        'longitude'=>$lieu->getLongitude()
//                    ];
            }

        }catch(\Exception $e){
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => 'Une erreur serveur est survenue.']), 500, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/admin/ban-user', name: 'ban_user_admin')]
    public function banUser(Request $request, EntityManagerInterface $entityManager, ParticipantRepository $participantRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['idUser'])) {
            return $this->json(['error' => 'Veuillez renseigner un ID utilisateur valide'], Response::HTTP_BAD_REQUEST);
        }

        $idUser = $data['idUser'];

        $user = $participantRepository->find($idUser);

        if($user != null){
            try{
                $user->setIsActiv(false);
                $entityManager->flush();
                return $this->json(['message' => 'Utilisateur désactivé'], Response::HTTP_CREATED);
            } catch (\Exception $e) {
                return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
            }
        }else{
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_CREATED);
        }
    }

    #[Route('/admin/unban-user', name: 'unban_user_admin')]
    public function unbanUser(Request $request, EntityManagerInterface $entityManager, ParticipantRepository $participantRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['idUser'])) {
            return $this->json(['error' => 'Veuillez renseigner un ID utilisateur valide'], Response::HTTP_BAD_REQUEST);
        }

        $idUser = $data['idUser'];

        $user = $participantRepository->find($idUser);

        if($user != null){
            try{
                $user->setIsActiv(true);
                $entityManager->flush();
                return $this->json(['message' => 'Utilisateur activé'], Response::HTTP_CREATED);
            } catch (\Exception $e) {
                return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
            }
        }else{
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_CREATED);
        }
    }


    #[Route('/admin/cancel-sortie',name: 'cancel_sortie_admin')]
    public function cancelSortie(SortieRepository $sortieRepository,EtatRepository $etatRepository,EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $motif = $data['motifAnnulation'];
        $idSortie = $data['idSortie'];

        $sortie = $sortieRepository->find($idSortie);

        if (!$sortie){
            return $this->json(['message' => 'Sortie non trouvée.'], Response::HTTP_NOT_FOUND);
        }

        $etat = $etatRepository->findOneBy(['libelle'=>'annulée']);

        if (!$etat){
            return $this->json(['message' => 'Etat non trouvé.'], Response::HTTP_NOT_FOUND);
        }

        if (!$motif){
            return $this->json(['message' => 'Motif non renseigné'], Response::HTTP_NOT_FOUND);
        }

        try{
            $sortie->setEtat($etat);
            $sortie->setInfosSortie('Annulée pour cause de : '.$motif);
            $entityManager->flush();
            return $this->json(['message' => 'Sortie annulée.'], Response::HTTP_CREATED);
        }catch (\Exception $e){
            return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
        }

    }

    #[Route('/admin/delete-user', name: 'delete_user_admin')]
    public function deleteUser(Request $request, EntityManagerInterface $entityManager, ParticipantRepository $participantRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['idUser'])) {
            return $this->json(['error' => 'Veuillez renseigner un ID utilisateur valide'], Response::HTTP_BAD_REQUEST);
        }

        $idUser = $data['idUser'];

        $user = $participantRepository->find($idUser);

        if($user != null){
            try{
                $entityManager->remove($user);
                $entityManager->flush();
                return $this->json(['message' => 'Utilisateur supprimé'], Response::HTTP_CREATED);
            } catch (\Exception $e) {
                return new Response(json_encode(['error' => $e->getMessage()]), Response::HTTP_BAD_REQUEST, ['Content-Type' => 'application/json']);
            }
        }else{
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_CREATED);
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
