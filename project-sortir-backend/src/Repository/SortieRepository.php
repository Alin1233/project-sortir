<?php

namespace App\Repository;

use App\Entity\Sortie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Sortie>
 *
 * @method Sortie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sortie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sortie[]    findAll()
 * @method Sortie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SortieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sortie::class);
    }

//    /**
//     * @return Sortie[] Returns an array of Sortie objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Sortie
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
    public function findSortiesWhereUserNotInscrit($userId)
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT s
            FROM App\Entity\Sortie s
            WHERE s.id NOT IN (
                SELECT s2.id
                FROM App\Entity\Sortie s2
                JOIN s2.participants p
                WHERE p.id = :userId
            )'
        )->setParameter('userId', $userId);

        return $query->getResult();
    }
    public function findRecentSortiesWithEtatPassee()
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQueryBuilder()
            ->select('s')
            ->from('App\Entity\Sortie', 's')
            ->join('s.etat', 'e')
            ->where('e.libelle = :etat')
            ->andWhere('s.dateHeureDebut > :oneMonthAgo')
            ->setParameter('etat', 'Passée')
            ->setParameter('oneMonthAgo', new \DateTime('-1 month'))
            ->getQuery();

        return $query->getResult();
    }

    public function findSortiesByFilters($filters, $userId)
{
    $entityManager = $this->getEntityManager();

    // Si aucun filtre n'est fourni, toutes les entités de la sortie sont renvoyées.
    if (empty($filters)) {
        return $entityManager->getRepository('App\Entity\Sortie')->createQueryBuilder('s')
        ->join('s.etat', 'e')
        ->where('e.libelle != :excludedEtat')
        ->setParameter('excludedEtat', 'Historisée')
        ->getQuery()
        ->getResult();
    }

    $queryBuilder = $entityManager->createQueryBuilder()
                                ->select('s')
                                ->from('App\Entity\Sortie', 's')
                                ->join('s.etat', 'e')
                                ->where('e.libelle != :excludedEtat')
                                ->setParameter('excludedEtat', 'Historisée');

    $orX = $queryBuilder->expr()->orX();

    if (in_array('inscrit', $filters)) {
        $orX->add($queryBuilder->expr()->exists(
            $entityManager->createQueryBuilder()
                          ->select('p')
                          ->from('App\Entity\Participant', 'p')
                          ->join('p.sortie', 's1')
                          ->where('s1.id = s.id')
                          ->andWhere('p.id = :userId')
        ));
    }

    if (in_array('organisateur', $filters)) {
        $orX->add('s.organisateur = :userId');
    }
    if (in_array('nonInscrit', $filters)) {
        $orX->add($queryBuilder->expr()->not(
            $queryBuilder->expr()->exists(
                $entityManager->createQueryBuilder()
                              ->select('p2')
                              ->from('App\Entity\Participant', 'p2')
                              ->join('p2.sortie', 's2')
                              ->where('s2.id = s.id')
                              ->andWhere('p2.id = :userId')
            )
        ));
    }
    if (in_array('passee', $filters)) {
        $queryBuilder->join('s.etat', 'e');
        $orX->add('e.libelle = :etat');
        $queryBuilder->setParameter('etat', 'Passée');

        // Ajout d'une condition pour les sorties de moins d'un mois
        $queryBuilder->andWhere('s.dateHeureDebut > :oneMonthAgo');
        $queryBuilder->setParameter('oneMonthAgo', new \DateTime('-1 month'));
    }
    if (in_array('inscrit', $filters) || in_array('organisateur', $filters) || in_array('nonInscrit', $filters)) {
        $queryBuilder->setParameter('userId', $userId);
    }

    $queryBuilder->andWhere($orX);

    return $queryBuilder->getQuery()->getResult();
}
}
