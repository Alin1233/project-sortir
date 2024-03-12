<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SortieController extends AbstractController
{
    #[Route('/creer', name: 'app_sortie')]
    public function index(Request $request): Response
    {   
        // Obtenir les paramètres de la requête
        $data = json_decode($request->getContent(), true);

        // Récupérer le courrier et le mot de passe de la requête
        $mail = $data['mail'];
        $motdepasse = $data['motdepasse'];

        
        return new Response();
    }
}
