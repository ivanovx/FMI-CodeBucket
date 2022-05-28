package pro.ivanov.CodeBucket.repositories;

import org.springframework.data.repository.CrudRepository;

import pro.ivanov.CodeBucket.models.Bucket;

public interface BucketRepository extends CrudRepository<Bucket, Integer> { }