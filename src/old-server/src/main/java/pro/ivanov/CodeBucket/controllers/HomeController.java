package pro.ivanov.CodeBucket.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pro.ivanov.CodeBucket.repositories.BucketRepository;
import pro.ivanov.CodeBucket.models.Bucket;

@RestController()
public class HomeController {
	private final BucketRepository buckets;
	
	public HomeController(BucketRepository buckets) {
		this.buckets = buckets;
	}
	
	@GetMapping("/home")
	public String index() {
		return "Home";
	}
	
	@GetMapping("/home/all")
	public Iterable<Bucket> all() {
		return this.buckets.findAll();
	}
}