<?php

namespace App\DataFixtures;

use App\Entity\Etat;
use App\Entity\Lieu;
use App\Entity\Sortie;
use App\Entity\Ville;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Campus;
use App\Entity\Participant;
class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        //Create campuses
        $campus = new Campus();
        $campus->setNom('Nantes');
        $campus2 = new Campus();
        $campus2->setNom('Honk Hong');
        $campus3 = new Campus();
        $campus3->setNom('PlafondChezAlexis');

        //Create ville

        $ville=new Ville();
        $ville->setNom('Nantes');
        $ville->setCodePostal('40000');
        $ville2=new Ville();
        $ville2->setNom('Lyon');
        $ville2->setCodePostal('69000');
        $ville3=new Ville();
        $ville3->setNom('Chambery');
        $ville3->setCodePostal('73000');
        $ville4=new Ville();
        $ville4->setNom('Rennes');
        $ville4->setCodePostal('35000');

        //Create Lieux

        //Lieu a Nantes
        $lieu=new Lieu();
        $lieu->setNom('Bar Chez Roger');
        $lieu->setRue('Rue de la boisson');
        $lieu->setLatitude(47.2173);
        $lieu->setLongitude(-1.5534);
        $lieu->setVille($ville);
        $lieu2=new Lieu();
        $lieu2->setNom('Bowling La Quille');
        $lieu2->setRue('Faubourg Bouboulle');
        $lieu2->setLatitude(47.217);
        $lieu2->setLongitude(-1.553);
        $lieu2->setVille($ville);
        //Lieu a Lyon
        $lieu3=new Lieu();
        $lieu3->setNom('Raouh le Lyon');
        $lieu3->setRue('Rue du Zoo');
        $lieu3->setLatitude(45.750000);
        $lieu3->setLongitude(4.850000);
        $lieu3->setVille($ville2);
        $lieu4=new Lieu();
        $lieu4->setNom('EscapeGaming');
        $lieu4->setRue('Place du Je');
        $lieu4->setLatitude(45.750001);
        $lieu4->setLongitude(4.850000);
        $lieu4->setVille($ville2);
        //Lieu a Chambery
        $lieu5=new Lieu();
        $lieu5->setNom('Lanceur de Fleche');
        $lieu5->setRue('Avenue Baissez la tete');
        $lieu5->setLatitude(	45.564601);
        $lieu5->setLongitude(5.917780);
        $lieu5->setVille($ville3);
        $lieu6=new Lieu();
        $lieu6->setNom('ReactScion');
        $lieu6->setRue('Allée des Jumeaux');
        $lieu6->setLatitude(	45.564601);
        $lieu6->setLongitude(5.917781);
        $lieu6->setVille($ville3);
        //Lieu a Rennes
        $lieu7=new Lieu();
        $lieu7->setNom('Rennes et Dada');
        $lieu7->setRue('Rue et hénis');
        $lieu7->setLatitude(	48.0833);
        $lieu7->setLongitude(-1.6833);
        $lieu7->setVille($ville4);
        $lieu8=new Lieu();
        $lieu8->setNom('ReactScion');
        $lieu8->setRue('Allée des Jumeaux');
        $lieu8->setLatitude(	48.0833);
        $lieu8->setLongitude(-1.6832);
        $lieu8->setVille($ville4);

        //Create a User
        $participant = new Participant();
        $participant -> setPseudo('BobLeponge');
        $participant -> setNom('nomBob');
        $participant -> setPrenom('prenomBob');
        $participant -> setTelephone(1234567890);
        $participant -> setMail('userBob@example.com');
        $participant -> setMotPasse('1234');
        $participant -> setIsAdmin(true);
        $participant -> setIsActiv(true);
        $participant -> setCampus($campus);

        $participant2 = new Participant();
        $participant2 -> setPseudo('PatrickLEtoile');
        $participant2 -> setNom('nomPatrick');
        $participant2 -> setPrenom('prenomPatrick');
        $participant2 -> setTelephone(1234567890);
        $participant2 -> setMail('userPatrick@example.com');
        $participant2 -> setMotPasse('1234');
        $participant2 -> setIsAdmin(true);
        $participant2 -> setIsActiv(true);
        $participant2 -> setCampus($campus2);

        $participant3 = new Participant();
        $participant3 -> setPseudo('CrabsLeCrabe');
        $participant3 -> setNom('nomCrabs');
        $participant3 -> setPrenom('prenomCrabs');
        $participant3 -> setTelephone(1234567890);
        $participant3 -> setMail('userCrabs@example.com');
        $participant3 -> setMotPasse('1234');
        $participant3 -> setIsAdmin(false);
        $participant3 -> setIsActiv(true);
        $participant3 -> setCampus($campus3);


        //Create etat

        $etat= new Etat();
        $etat->setLibelle('Creee');
        $etat2= new Etat();
        $etat2->setLibelle('Ouverte');
        $etat3= new Etat();
        $etat3->setLibelle('Cloturée');
        $etat4= new Etat();
        $etat4->setLibelle('Activité en cours');
        $etat5= new Etat();
        $etat5->setLibelle('Passée');
        $etat6= new Etat();
        $etat6->setLibelle('Annulée');
        $etat7= new Etat();
        $etat7->setLibelle('Historisée');


        //Create Sortie

        $sortie= new Sortie();
        $sortie->setNom('Courir avec un arbre');
        $sortie->setInfosSortie('Courir puis calin');
        $sortie->setCampus($campus);
        $sortie->setEtat($etat);
        $sortie->setLieu($lieu);
        $now = new DateTime();
        $now->modify('+10 day');
        $sortie->setDateHeureDebut($now);
        $now->modify('+1 month');
        $sortie->setDateLimiteInscription($now);
        $sortie->setNbInscriptionMax(10);
        $sortie->setDuree(110);
        $sortie->addParticipant($participant);
        $sortie->addParticipant($participant2);
        $sortie->setOrganisateur($participant);

        $sortie2= new Sortie();
        $sortie2->setNom('Brain un Singe');
        $sortie2->setInfosSortie('Echec puis banane flambée');
        $sortie2->setCampus($campus2);
        $sortie2->setEtat($etat2);
        $sortie2->setLieu($lieu3);
        $now2 = new DateTime();
        $now2->modify('+2 days');
        $sortie2->setDateHeureDebut($now2);
        $now2->modify('+7 days');
        $sortie2->setDateLimiteInscription($now2);
        $sortie2->setNbInscriptionMax(10);
        $sortie2->setDuree(100);
        $sortie2->addParticipant($participant);
        $sortie2->addParticipant($participant3);
        $sortie2->setOrganisateur($participant3);

        $sortie3= new Sortie();
        $sortie3->setNom('Apprendre a boire');
        $sortie3->setInfosSortie('Prendre une bière par la main');
        $sortie3->setCampus($campus);
        $sortie3->setEtat($etat3);
        $sortie3->setLieu($lieu2);
        $now3 = new DateTime();
        $now3->modify('-4 days');
        $sortie3->setDateHeureDebut($now3);
        $now3->modify('+8 days');
        $sortie3->setDateLimiteInscription($now3);
        $sortie3->setNbInscriptionMax(2);
        $sortie3->setDuree(20);
        $sortie3->addParticipant($participant2);
        $sortie3->addParticipant($participant3);
        $sortie3->setOrganisateur($participant2);

        $sortie4= new Sortie();
        $sortie4->setNom('Partager son potager');
        $sortie4->setInfosSortie('Pas cher, pas cher');
        $sortie4->setCampus($campus2);
        $sortie4->setEtat($etat4);
        $sortie4->setLieu($lieu4);
        $now4 = new DateTime();
        $now4->modify('-1 second');
        $sortie4->setDateHeureDebut($now4);
        $now4->modify('-2 hour');
        $sortie4->setDateLimiteInscription($now4);
        $sortie4->setNbInscriptionMax(10);
        $sortie4->setDuree(300);
        $sortie4->addParticipant($participant);
        $sortie4->setOrganisateur($participant);

        $sortie5= new Sortie();
        $sortie5->setNom('Formez un Boys Band');
        $sortie5->setInfosSortie('Devenez le nouveau Gary Barlow');
        $sortie5->setCampus($campus3);
        $sortie5->setEtat($etat5);
        $sortie5->setLieu($lieu5);
        $now5 = new DateTime();
        $now5->modify('-1 days');
        $sortie5->setDateHeureDebut($now5);
        $now5->modify('-10 days');
        $sortie5->setDateLimiteInscription($now5);
        $sortie5->setNbInscriptionMax(10);
        $sortie5->setDuree(100);
        $sortie5->addParticipant($participant);
        $sortie5->addParticipant($participant2);
        $sortie5->setOrganisateur($participant2);

        $sortie6= new Sortie();
        $sortie6->setNom('Changer de pantalon');
        $sortie6->setInfosSortie('Enfin!!!');
        $sortie6->setCampus($campus3);
        $sortie6->setEtat($etat6);
        $sortie6->setLieu($lieu6);
        $now6= new DateTime();
        $now6->modify('+10 days');
        $sortie6->setDateHeureDebut($now6);
        $now6->modify('+5 days');
        $sortie6->setDateLimiteInscription($now6);
        $sortie6->setNbInscriptionMax(10);
        $sortie6->setDuree(100);
        $sortie6->addParticipant($participant3);
        $sortie6->setOrganisateur($participant3);

        $sortie7= new Sortie();
        $sortie7->setNom('Vivre dans le passé');
        $sortie7->setInfosSortie('Ecouter le vent souffler');
        $sortie7->setCampus($campus3);
        $sortie7->setEtat($etat7);
        $sortie7->setLieu($lieu7);
        $now7= new DateTime();
        $now7->modify('-2 months');
        $sortie7->setDateHeureDebut($now7);
        $now7->modify('+5 days');
        $sortie7->setDateLimiteInscription($now7);
        $sortie7->setNbInscriptionMax(10);
        $sortie7->setDuree(100);
        $sortie7->addParticipant($participant2);
        $sortie7->setOrganisateur($participant2);



        $manager->persist($campus);
        $manager->persist($participant);
        $manager->persist($campus2);
        $manager->persist($participant2);
        $manager->persist($campus3);
        $manager->persist($participant3);

        $manager->persist($ville);
        $manager->persist($ville2);
        $manager->persist($ville3);
        $manager->persist($ville4);

        $manager->persist($lieu);
        $manager->persist($lieu2);
        $manager->persist($lieu3);
        $manager->persist($lieu4);
        $manager->persist($lieu5);
        $manager->persist($lieu6);
        $manager->persist($lieu7);
        $manager->persist($lieu8);

        $manager->persist($etat);
        $manager->persist($etat2);
        $manager->persist($etat3);
        $manager->persist($etat4);
        $manager->persist($etat5);
        $manager->persist($etat6);
        $manager->persist($etat7);

        $manager->persist($sortie);
        $manager->persist($sortie2);
        $manager->persist($sortie3);
        $manager->persist($sortie4);
        $manager->persist($sortie5);
        $manager->persist($sortie6);
        $manager->persist($sortie7);

        $manager->flush();
    }
}
