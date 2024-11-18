package com.example.backend.dto.member;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Member {
  private String id;
  private String email;
  private String password;
  private String description;
  private LocalDate inserted;
}
