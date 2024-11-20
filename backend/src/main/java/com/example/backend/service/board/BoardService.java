package com.example.backend.service.board;

import com.example.backend.dto.board.Board;
import com.example.backend.mapper.board.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
  final BoardMapper mapper;

  public boolean add(Board board, Authentication authentication, MultipartFile[] files) {
    board.setWriter(authentication.getName());

    if (files != null && files.length > 0) {
      //folder 만들기
      String directory = "C:/Temp/prj1114/" + board.getId() + "}";
      File dir = new File(directory);
      if (!dir.exists()) {
        dir.mkdirs();
      }
      //file 업로드

      //TODO:local -> aws
      for (MultipartFile file : files) {
        String filePath = "c:/Temp/prj1114/" + board.getId() + "/{file.getOriginalFilename()}";
        try {

          file.transferTo(new File(filePath));
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
    }
    int cnt = mapper.insert(board);

    return cnt == 1;
  }

  public Map<String, Object> list(Integer page) {
    return Map.of("list", mapper.selectPage((page - 1) * 10),
            "count", mapper.countAll());
  }

  public Board get(int id) {
    return mapper.selectById(id);
  }

  public boolean validate(Board board) {
    boolean title = board.getTitle().trim().length() > 0;
    boolean content = board.getContent().trim().length() > 0;
    return title && content;
  }

  public boolean remove(int id) {
    int cnt = mapper.deleteById(id);
    return cnt == 1;
  }

  public boolean update(Board board) {
    int cnt = mapper.update(board);
    return cnt == 1;
  }

  public boolean hasAccess(int id, Authentication authentication) {
    Board board = mapper.selectById(id);

    return board.getWriter().equals(authentication.getName());
  }
}
