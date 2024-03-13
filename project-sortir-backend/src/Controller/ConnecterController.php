<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Participant;
use App\Repository\CampusRepository;
use App\Repository\ParticipantRepository;
use Psr\Log\LoggerInterface;

class ConnecterController extends AbstractController
{
    #[Route('/connecter', name: 'app_connecter')]
    public function index(Request $request, ParticipantRepository $participantRepository, CampusRepository $campusRepository): Response
    {   
        // Obtenir les paramètres de la requête
        $data = json_decode($request->getContent(), true);

        // Récupérer le courrier et le mot de passe de la requête
        $mail = $data['mail'];
        $motdepasse = $data['motdepasse'];
        // Trouver le participant à l'aide de son mail et de son mot de passe
        $participant = $participantRepository->findOneBy(['mail' => $mail, 'motPasse' => $motdepasse]);


        // check if participant has other prprieties beside email and password if yes send all the data as normal if not send just user obj with email and password


        if ($participant) {
            $campus = $participant->getCampus();
            $participantData = [
                'id' => $participant->getId(),
                'nom' => $participant->getNom(),
                'prenom' => $participant->getPrenom(),
                'telephone' => $participant->getTelephone(),
                'mail' => $participant->getMail(),
                'isAdmin' => $participant->isIsAdmin(),
                'isActiv' => $participant->isIsActiv(),
                'campus' => [
                    'id' => $campus->getId(),
                    'nom' => $campus->getNom(),
                ],
            ];
            $response = $this->json([
                'participant' => $participantData,
            ]);
        } else {
            $response = $this->json([
                'error' => 'No participant found with the provided mail and password',
            ]);
        }
        
        return $response;
    }
}
