<?php

namespace App\Controller;

use App\Repository\ParticipantRepository;
use App\Repository\SortieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ParticipantController extends AbstractController
{
    #[Route('/participants/sortie/{idSortie}', name: 'get_participants_by_sortie_id', methods: 'POST')]
    public function getParticipantsBySortieId(Request $request, int $idSortie, SerializerInterface $serializer, EntityManagerInterface $entityManager, SortieRepository $sortieRepository, ParticipantRepository $participantRepository): Response
    {
        $idParticipants = json_decode($request->getContent(), true)['idParticipants']; // Assure-toi que c'est bien formaté ainsi dans ton corps de requête

        if (!is_array($idParticipants)) {
            return $this->json(['error' => 'idParticipants doit être un tableau.'], Response::HTTP_BAD_REQUEST);
        }
        try {
            $queryBuilder = $participantRepository->createQueryBuilder('p')
                ->select('p.nom') // Sélectionne uniquement le champ 'nom'
                ->where('p.id IN (:idParticipants)')
                ->setParameter('idParticipants', $idParticipants)
                ->getQuery();

            $participants = $queryBuilder->getResult();

            return $this->json($participants);
        } catch (\Exception $e) {
            return new Response(json_encode(['error' => 'Une erreur serveur est survenue.']), 500, ['Content-Type' => 'application/json']);
        }
    }
}
