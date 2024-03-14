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
        // create campuses
        $campus = new Campus();
        $campus->setNom('Nantes');
        $campus2 = new Campus();
        $campus2->setNom('Honk Hong');
        $campus3 = new Campus();
        $campus3->setNom('PlafondChezAlexis');


        // create a User
        $participant = new Participant();
        $participant -> setPseudo('BobLeponge');
        $participant -> setNom('nomBob');
        $participant -> setPrenom('prenomBob');
        $participant -> setTelephone(123456);
        $participant -> setMail('user@example.com');
        $participant -> setMotPasse('1234');
        $participant -> setIsAdmin(true);
        $participant -> setIsActiv(true);
        $participant -> setCampus($campus);

        $participant2 = new Participant();
        $participant2 -> setPseudo('PatrickLEtoile');
        $participant2 -> setNom('nomPatrick');
        $participant2 -> setPrenom('prenomPatrick');
        $participant2 -> setTelephone(123456);
        $participant2 -> setMail('user@example.com');
        $participant2 -> setMotPasse('1234');
        $participant2 -> setIsAdmin(true);
        $participant2 -> setIsActiv(true);
        $participant2 -> setCampus($campus2);

        $participant3 = new Participant();
        $participant3 -> setPseudo('CrabsLeCrabe');
        $participant3 -> setNom('nomCrabs');
        $participant3 -> setPrenom('prenomCrabs');
        $participant3 -> setTelephone(123456);
        $participant3 -> setMail('user@example.com');
        $participant3 -> setMotPasse('1234');
        $participant3 -> setIsAdmin(true);
        $participant3 -> setIsActiv(true);
        $participant3 -> setCampus($campus3);

        $manager->persist($campus);
        $manager->persist($participant);
        $manager->persist($campus2);
        $manager->persist($participant2);
        $manager->persist($campus3);
        $manager->persist($participant3);


        $manager->flush();
    }
}
