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
use Symfony\Component\HttpFoundation\BinaryFileResponse;

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


        // check if participant has other proprieties beside email and password if yes send all the data as normal if not send just user obj with email and password


        if ($participant) {
            $campus = $participant->getCampus();
            $participantData = [
                'id' => $participant->getId(),
                'pseudo'=> $participant->getPseudo(),
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
                'image'=> $participant->getImage()
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
    #[Route('/connecter/cookie', name: 'app_connectionCookie')]
    public function connectionCookie(Request $request, ParticipantRepository $participantRepository, CampusRepository $campusRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];

        $participant = $participantRepository->findOneBy(['id' => $id]);

        if ($participant) {
            $campus = $participant->getCampus();
            $participantData = [
                'id' => $participant->getId(),
                'pseudo'=> $participant->getPseudo(),
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
                'image'=> $participant->getImage()
            ];
            $response = $this->json([
                'participant' => $participantData,
            ]);
        } else {
            $response = $this->json([
                'error' => 'No participant found id',
            ]);
        }

        return $response;

    }

    #[Route('/getimage/{imageName}', name: 'get_image', requirements: ['imageName' => '.+'])]
    public function getProfileImage(string $imageName): Response
    {   
        
        $projectDir = $this->getParameter('kernel.project_dir');
        $imagePath = $projectDir . '/public/uploads/photo_profile/'.$imageName;
        $response = new BinaryFileResponse($imagePath);
        $response->headers->set('Content-Type', 'image/png');
        return $response;
        
    }
}
