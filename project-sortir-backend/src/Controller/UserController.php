<?php

namespace App\Controller;

use App\Repository\ParticipantRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/isAdmin/{id}', name: 'is_user_admin')]
    public function isAdmin(int $id, ParticipantRepository $participantRepository): Response
    {
        $user = $participantRepository->find($id);
        if (null === $user) {

            return new Response('User not found', Response::HTTP_NOT_FOUND);
        }

        $isAdmin = $user->isIsAdmin();
        return new Response(json_encode(['isAdmin' => $isAdmin]), Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}