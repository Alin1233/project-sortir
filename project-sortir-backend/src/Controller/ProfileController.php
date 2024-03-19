<?php

namespace App\Controller;

use ApiPlatform\Elasticsearch\Tests\Fixtures\User;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Participant;
use App\Repository\CampusRepository;
use App\Repository\ParticipantRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

#[Route('/profile', name: 'app_profile')]
class ProfileController extends AbstractController
{
    #[Route('', name: 'app_index')]
    public function index(Request $request,CampusRepository $campusRepository)
    {
        $campusAll=$campusRepository->findAll();
        $campusList=[];
        foreach ($campusAll as $campus){
            $campusId=$campus->getId();
            $campusName=$campus->getNom();
            $campusObjet=['id'=>$campusId, 'nom' =>$campusName];
            $campusList[]=$campusObjet;
        }
        return $this->json([
            'campus'=>$campusList
        ]);
    }

    #[Route('/modifier', name: 'app_modifier')]
    public function modifier(Request $request, ParticipantRepository $participantRepository,EntityManagerInterface $entityManager,CampusRepository $campusRepository, FileUploader $fileUploader)
    {
        try {
            $data = json_decode($request->getContent(), true);
            //$image=$request->files->get('image');



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
                /*if ($image) {
                    $imageFilename = $fileUploader->upload($image);
                    $participant->setImage($imageFilename);
                }*/

                $campus2 = $participant->getCampus();
                $participantSansMDP = [
                    'id' => $participant->getId(),
                    'pseudo'=> $participant->getPseudo(),
                    'nom' => $participant->getNom(),
                    'prenom' => $participant->getPrenom(),
                    'telephone' => $participant->getTelephone(),
                    'mail' => $participant->getMail(),
                    'isAdmin' => $participant->isIsAdmin(),
                    'isActiv' => $participant->isIsActiv(),
                    'image'=> $participant->getImage(),
                    'campus' => [
                        'id' => $campus2->getId(),
                        'nom' => $campus2->getNom(),
                    ]
                ];

                $entityManager->flush();

                return $this->json(['participant' => $participantSansMDP]);
            }
        }catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage(), 'code'=>$e->getCode()]), 400, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/id/{id}', name: 'app_autreUtilisateur')]
    public function getAutreProfil(int $id ,ParticipantRepository $participantRepository,CampusRepository$campusRepository, Request $request): Response
    {

        $participant = $participantRepository->findOneBy(['id'=>$id]);
        $participantId=$participant->getId();
        $campus=$campusRepository->findOneBy(['id'=>$participantId]);
        $participantAvecCampus= [
            'id'=>$participant->getId(),
            'pseudo'=>$participant->getPseudo(),
            'nom'=>$participant->getNom(),
            'prenom'=>$participant->getPrenom(),
            'telephone'=>$participant->getTelephone(),
            'email'=>$participant->getMail(),
            'campusId'=>$campus->getId(),
            'campusNom'=>$campus->getNom()
        ];

        return $this->json(['participant'=>$participantAvecCampus]);
    }


    #[Route('/upload', name: 'app_upload')]
    public function uploadImage(Request $request,FileUploader $fileUploader, ParticipantRepository $participantRepository, EntityManagerInterface $entityManager): Response
    {
        $uploadedFile = $request->files->get('file');

        $participantId = $request->request->get('id'); 
        
        $participant = $participantRepository->find($participantId);

        if ($uploadedFile) {
            
        $fileName = $participant->getId().$participant->getNom()."profile";

        $destination = $this->getParameter('uploads_directory');

        $uploadedFile->move($destination, $fileName);

        $participant->setImage($fileName);
        
        $entityManager->flush();
        
        
        return new Response('Image téléchargée avec succès.', 200);
        }

        return new Response('Aucune image envoyée.', 400);
    }
   
}