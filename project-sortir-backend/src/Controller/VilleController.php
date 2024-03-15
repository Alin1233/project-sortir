<?php

namespace App\Controller;

use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class VilleController extends AbstractController
{
    #[Route('/ville/{id}', name: 'get_ville_by_id')]
    public function getVilleById(int $id, EntityManagerInterface $entityManager, VilleRepository $villeRepository, SerializerInterface $serializer): Response
    {
        try{
            $ville = $villeRepository->find($id);
            if (!$ville) {
                return $this->json(['message' => 'Ville non trouvée.'], Response::HTTP_NOT_FOUND);
            }
            $data = $serializer->serialize($ville, 'json');

            return new Response($data, 200, ['Content-Type' => 'application/json']);

        }catch(\Exception $e){
            // Utilisez HTTP 500 pour les erreurs serveur
            return new Response(json_encode(['error' => 'Une erreur serveur est survenue.']), 500, ['Content-Type' => 'application/json']);
        }
    }
}