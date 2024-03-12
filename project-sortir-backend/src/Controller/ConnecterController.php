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
        if ($participant) {
            $response = $this->json([
                'participant' => $participant,
            ]);
        } else {
            $response = $this->json([
                'error' => 'No participant found with the provided mail and password',
            ]);
        }
    
        return $response;
    }
}
