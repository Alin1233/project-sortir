<?php

namespace App\DataFixtures;

use App\Entity\Campus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\Participant;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{   private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {

        $campus = new Campus();
        $campus->setNom('Nantes');

        // create a User
        $user = new User();
        $user->setEmail('user@example.com');
        $plaintextPassword = "ola";
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);

        $participant = new Participant();
        $participant -> setNom('nom_participant_1');
        $participant -> setPrenom('prenom_participant_1');
        $participant -> setTelephone(123456);
        $participant -> setMail('user@example.com');
        $participant -> setMotPasse($hashedPassword);
        $participant -> setIsAdmin(true);
        $participant -> setIsActiv(true);
        $participant -> setCampus($campus);
        $participant -> setUser($user);

        $manager->persist($campus);
        $manager->persist($user);
        $manager->persist($participant);
        $manager->flush();

    }
}
