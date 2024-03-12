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
    public function index(Request $request, ParticipantRepository $participantRepository, CampusRepository $campusRepository): JsonResponse
    {   
        // Get query parameters
        $queryParameters = $request->query->all();

        // Get request body parameters
        $bodyParameters = $request->request->all();

        $data = json_decode($request->getContent(), true);


       $participants = $participantRepository->findAll();
       $campus = $campusRepository->findAll();
       $content = json_encode($participants);
       dump($content);
       dump($participants);
       return $this->json([
        'campus' =>  $campus,
        'participants' => $participants,
    ]);
    }
}
