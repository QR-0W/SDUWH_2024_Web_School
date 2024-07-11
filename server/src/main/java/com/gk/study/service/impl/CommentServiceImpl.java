package com.gk.study.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.Comment;
import com.gk.study.mapper.CommentMapper;
import com.gk.study.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Autowired
    CommentMapper mapper; // 自动注入CommentMapper

    /**
     * 获取所有评论列表
     *
     * @return 所有评论列表
     */
    @Override
    public List<Comment> getCommentList() {
        return mapper.getList(); // 获取所有评论列表
    }

    /**
     * 创建评论
     *
     * @param comment 评论对象
     */
    @Override
    public void createComment(Comment comment) {
        System.out.println(comment); // 打印评论信息（调试用）
        comment.setCommentTime(String.valueOf(System.currentTimeMillis())); // 设置评论时间为当前时间戳
        mapper.insert(comment); // 插入评论记录
    }

    /**
     * 删除评论
     *
     * @param id 评论ID
     */
    @Override
    public void deleteComment(String id) {
        mapper.deleteById(id); // 根据ID删除评论记录
    }

    /**
     * 更新评论
     *
     * @param comment 评论对象
     */
    @Override
    public void updateComment(Comment comment) {
        mapper.updateById(comment); // 根据ID更新评论信息
    }

    /**
     * 获取评论详情
     *
     * @param id 评论ID
     * @return 评论详情
     */
    @Override
    public Comment getCommentDetail(String id) {
        return mapper.selectById(id); // 根据ID查询评论详情
    }

    /**
     * 获取某个物品的评论列表
     *
     * @param thingId 物品ID
     * @param order   排序方式
     * @return 物品的评论列表
     */
    @Override
    public List<Comment> getThingCommentList(String thingId, String order) {
        return mapper.selectThingCommentList(thingId, order); // 查询某个物品的评论列表
    }

    /**
     * 获取某个用户的评论列表
     *
     * @param userId 用户ID
     * @return 用户的评论列表
     */
    @Override
    public List<Comment> getUserCommentList(String userId) {
        return mapper.selectUserCommentList(userId); // 查询某个用户的评论列表
    }
}
