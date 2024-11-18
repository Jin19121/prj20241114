package com.example.backend.mapper.member;

import com.example.backend.dto.member.Member;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MemberMapper {
  @Select("""
          
          SELECT id, inserted
          FROM member
          ORDER BY id
          """)
  List<Member> selectAll();

  Member selectById(String id);

  @Delete("""
          DELETE FROM member
          WHERE id = #{id}
          """)
  int deleteById(String id);
}
