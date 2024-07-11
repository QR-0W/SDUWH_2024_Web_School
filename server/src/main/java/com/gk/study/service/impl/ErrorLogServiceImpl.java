package com.gk.study.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gk.study.entity.ErrorLog;
import com.gk.study.mapper.ErrorLogMapper;
import com.gk.study.service.ErrorLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ErrorLogServiceImpl extends ServiceImpl<ErrorLogMapper, ErrorLog> implements ErrorLogService {

    @Autowired
    ErrorLogMapper mapper; // 自动注入ErrorLogMapper

    /**
     * 获取所有错误日志列表
     *
     * @return 所有错误日志列表
     */
    @Override
    public List<ErrorLog> getErrorLogList() {
        return mapper.selectList(new QueryWrapper<>()); // 查询所有错误日志列表
    }

    /**
     * 创建错误日志
     *
     * @param errorLog 错误日志对象
     */
    @Override
    public void createErrorLog(ErrorLog errorLog) {
        mapper.insert(errorLog); // 插入错误日志记录
    }

    /**
     * 删除错误日志
     *
     * @param id 错误日志ID
     */
    @Override
    public void deleteErrorLog(String id) {
        mapper.deleteById(id); // 根据ID删除错误日志记录
    }

    /**
     * 更新错误日志
     *
     * @param errorLog 错误日志对象
     */
    @Override
    public void updateErrorLog(ErrorLog errorLog) {
        mapper.updateById(errorLog); // 根据ID更新错误日志信息
    }
}
