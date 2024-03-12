<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Campus;
use App\Entity\Participant;
class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $campus = new Campus();
        $campus->setNom('Nantes');

        // create a User
        $participant = new Participant();
        $participant -> setNom('nom_participant_1');
        $participant -> setPrenom('prenom_participant_1');
        $participant -> setTelephone(123456);
        $participant -> setMail('user@example.com');
        $participant -> setMotPasse('1234');
        $participant -> setIsAdmin(true);
        $participant -> setIsActiv(true);
        $participant -> setCampus($campus);
        $manager->persist($campus);
        $manager->persist($participant);
        $manager->flush();
    }
}
