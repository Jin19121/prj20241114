package com.example.backend.mapper.member;

import com.example.backend.dto.member.Member;
import com.example.backend.dto.member.MemberEdit;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

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

  @Update("""
          UPDATE member
          SET password = #{password},
              description = #{description}
          WHERE id = #{id}
          """)
  int update(MemberEdit member);
}
