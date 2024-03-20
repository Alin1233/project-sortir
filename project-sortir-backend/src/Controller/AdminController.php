<?php

namespace App\Controller;

use App\Entity\Participant;
use App\Repository\ParticipantRepository;
use Doctrine\ORM\EntityManagerInterface;
use http\Env\Request;
use App\Repository\CampusRepository;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


class AdminController extends AbstractController
{
    #[Route('/admin/addUser', name: 'add_user_admin')]
    public function addUser(Request $request, ParticipantRepository $participantRepository, EntityManagerInterface $entityManager): Response
    {
        try {

            $data = json_decode($request->getContent(), true);


                if($data['mail'] && $data['password']){
                    $mail = $data['mail'];
                    $password = $data['password'];

                    $participant = new Participant();
                    $participant -> setMail($mail);
                    $participant -> setMotPasse($password);
                    $entityManager -> persist($participant);
            }
            }catch (\Exception $e){
                return new Response(json_encode(['error' => $e->getMessage()]), 400, ['Content-Type' => 'application/json']);
            }
        return $this->json('Utilisateur crée avec succès');
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
