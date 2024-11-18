package com.example.backend.controller.board;

import com.example.backend.dto.member.Member;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
  final MemberService service;

  @GetMapping("{id}")
  public Member getMember(@PathVariable String id) {
    return service.get(id);
  }

  @GetMapping("list")
  public List<Member> list() {
    return service.list();
  }

}
