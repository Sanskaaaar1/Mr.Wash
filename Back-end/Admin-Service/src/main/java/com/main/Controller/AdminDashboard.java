package com.main.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminDashboard {

	@GetMapping("/dashboard")
	public String aaa() {
		return "a";
	}
}
