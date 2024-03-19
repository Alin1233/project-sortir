<?php

namespace App\Controller;

use App\Entity\Participant;
use App\Repository\CampusRepository;
use App\Repository\ParticipantRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


class AdminController extends AbstractController
{
    #[Route('/admin', name: 'app_admin')]
    public function index(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
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
            $campusData = $data['campus'];

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
