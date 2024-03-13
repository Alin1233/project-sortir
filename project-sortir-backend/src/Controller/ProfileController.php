<?php

namespace App\Controller;

use ApiPlatform\Elasticsearch\Tests\Fixtures\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Participant;
use App\Repository\CampusRepository;
use App\Repository\ParticipantRepository;
use Psr\Log\LoggerInterface;

#[Route('/profile', name: 'app_profile')]
class ProfileController extends AbstractController
{

    #[Route('', name: 'app_index')]
    public function index()
    {


        return $this->json([
            'user'=>$user
        ]);
    }

    #[Route('/modifier', name: 'app_modifier')]
    public function modifier(Request $request, ParticipantRepository $participantRepository,EntityManager $entityManager)
    {
        try {


            $data = json_decode($request->getContent(), true);

            $pseudo = $data['pseudo'];
            $prenom = $data['prenom'];
            $nom = $data['nom'];
            $telephone = $data['telephone'];
            $mail = $data['mail'];
            $campus = $data['campus'];
            if ($data['password'] === $data['confirmPassword']) {
                $password = $data['password'];

                $participant = $participantRepository->findOneBy(['mail' => $mail]);
                //$user=setPseudo($pseudo);
                $participant->setPrenom($prenom);
                $participant->setNom($nom);
                $participant->setTelephone($telephone);
                $participant->setMail($mail);
                $participant->setCampus($campus);
                $participant->setMotPasse($password);

                $entityManager->flush();
                $this->addFlash('success', 'Profile bien modifié!');

                return new Response();


            }
        }catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 400, ['Content-Type' => 'application/json']);
        }
    }
}