<?php

namespace App\Controller;

use App\Repository\LieuRepository;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\DocBlock\Serializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class LieuController extends AbstractController
{
    #[Route('/lieu/{ville}', name: 'get_lieu_by_id')]
    public function getLieuById($ville, EntityManagerInterface $entityManager, LieuRepository $lieuRepository, SerializerInterface $serializer): Response
    {
        try {
            $lieu = $lieuRepository->findBy(
                ['nom' => $ville]
            );
            if (!$lieu) {
                return $this->json(['message' => 'Lieu non trouvé.'], Response::HTTP_NOT_FOUND);
            }

            $data = $serializer->serialize($lieu, 'json');

            return new Response($data, 200, ['Content-Type' => 'application/json']);

        }catch(\Exception $e){
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => 'Une erreur serveur est survenue.']), 500, ['Content-Type' => 'application/json']);
        }
    }
}
