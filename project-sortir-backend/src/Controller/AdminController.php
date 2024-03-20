<?php

namespace App\Controller;

use App\Entity\Participant;
use App\Repository\ParticipantRepository;
use Doctrine\ORM\EntityManagerInterface;
use http\Env\Request;
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
}
