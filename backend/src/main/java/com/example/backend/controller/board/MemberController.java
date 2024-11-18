package com.example.backend.controller.board;

import com.example.backend.dto.member.Member;
import com.example.backend.dto.member.MemberEdit;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
  final MemberService service;

  @PutMapping("update")
  public void update(@RequestBody MemberEdit member) {
    service.update(member);
  }

  @DeleteMapping("remove")
  public ResponseEntity<Map<String, Object>> remove(@RequestBody Member member) {
    if (service.remove(member)) {
      //잘됨
      return ResponseEntity.ok(Map.of("message",
              Map.of("type", "success",
                      "text", "회원정보를 삭제하였습니다.")));
    } else {
      return ResponseEntity.badRequest()
              .body(Map.of("message",
                      Map.of("type", "warning",
                              "text", "비밀번호가 일치하지 않습니다.")));
    }
  }

  @GetMapping("{id}")
  public Member getMember(@PathVariable String id) {
    return service.get(id);
  }

  @GetMapping("list")
  public List<Member> list() {
    return service.list();
  }


  @PostMapping("signup")
  public void signup(@RequestBody Member member) {
    System.out.println(member);
  }
}
