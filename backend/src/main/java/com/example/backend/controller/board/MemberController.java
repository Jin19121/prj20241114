package com.example.backend.controller.board;

import com.example.backend.dto.member.Member;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
  final MemberService service;

  @DeleteMapping("remove")
  public void remove(@RequestBody Member member) {
    service.remove(member);
  }

  @GetMapping("{id}")
  public Member getMember(@PathVariable String id) {
    return service.get(id);
  }

  @GetMapping("list")
  public List<Member> list() {
    return service.list();
  }

}
