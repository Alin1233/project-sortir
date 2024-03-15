<?php

namespace App\Controller;

use ApiPlatform\Elasticsearch\Tests\Fixtures\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Participant;
use App\Repository\CampusRepository;
use App\Repository\ParticipantRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/profile', name: 'app_profile')]
class ProfileController extends AbstractController
{

    /*#[Route('', name: 'app_index')]
    public function index()
    {


        /*return $this->json([
            'user'=>$user
        ]);
    }*/

    #[Route('/modifier', name: 'app_modifier')]
    public function modifier(Request $request, ParticipantRepository $participantRepository,EntityManagerInterface $entityManager,CampusRepository $campusRepository)
    {
        try {


            $data = json_decode($request->getContent(), true);

            /*$premierParticipant=$participantRepository->findOneBy(['id'=>$data['id']]);
            $memeParticipant=$participantRepository->findOneBy(['pseudo'=>$data['pseudo']]);*/

            /*if ($premierParticipant['pseudo']===$memeParticipant['pseudo'] && $premierParticipant['mail']!==$memeParticipant['mail']){
                throw new \Exception('Le pseudo que vous avez chosis est déja pris! Damm!', 1);
            }elseif ($premierParticipant['pseudo']!==$memeParticipant['pseudo'] && $premierParticipant['mail']===$memeParticipant['mail']){
                throw new \Exception('L\'adresse mail que vous avez chosis est déja pris! Chokbar!', 2);
            }*/

            $pseudo = $data['pseudo'];
            $prenom = $data['prenom'];
            $nom = $data['nom'];
            $telephone = $data['telephone'];
            $email = $data['email'];
            $campus = $data['campus'];
            if ($data['password'] === $data['confirmPassword']) {
                $password = $data['password'];

                $participant = $participantRepository->findOneBy(['mail' => $email]);

                $participant -> setPseudo($pseudo);
                $participant->setPrenom($prenom);
                $participant->setNom($nom);
                $participant->setTelephone($telephone);
                $participant->setMail($email);
                $participant->setMotPasse($password);

                $campusBDD = $campusRepository->findOneBy(['nom'=>$campus]);
                $participant->setCampus($campusBDD);

                $entityManager->flush();
                return new Response();
            }
        }catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage(), 'code'=>$e->getCode()]), 400, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/{id}', name: 'app_autreUtilisateur')]
    public function getAutreProfil(ParticipantRepository $participantRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $participant = $participantRepository->findOneBy(['id'=>$data]);
        return new Response();
    }
}