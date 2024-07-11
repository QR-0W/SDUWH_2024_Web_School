package com.gk.study.utils;

import com.baomidou.mybatisplus.core.toolkit.ArrayUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * JSON 工具类，提供对象和 JSON 字符串之间的转换。
 */
public class JsonUtils {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 将对象转换为 JSON 字符串。
     *
     * @param object 要转换的对象
     * @return 转换后的 JSON 字符串
     * @throws RuntimeException 如果转换过程中发生异常
     */
    public static String toJsonString(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 将 JSON 字符串转换为指定类型的对象。
     *
     * @param text  JSON 字符串
     * @param clazz 目标对象的类
     * @param <T>   对象类型
     * @return 转换后的对象
     * @throws RuntimeException 如果转换过程中发生异常
     */
    public static <T> T parseObject(String text, Class<T> clazz) {
        if (StringUtils.isEmpty(text)) {
            return null;
        }
        try {
            return objectMapper.readValue(text, clazz);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 将 JSON 字节数组转换为指定类型的对象。
     *
     * @param bytes JSON 字节数组
     * @param clazz 目标对象的类
     * @param <T>   对象类型
     * @return 转换后的对象
     * @throws RuntimeException 如果转换过程中发生异常
     */
    public static <T> T parseObject(byte[] bytes, Class<T> clazz) {
        if (bytes == null || bytes.length <= 0) {
            return null;
        }
        try {
            return objectMapper.readValue(bytes, clazz);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 将 JSON 字符串转换为指定复杂类型的对象，如集合、Map 等。
     *
     * @param text          JSON 字符串
     * @param typeReference 目标复杂类型的 TypeReference
     * @param <T>           对象类型
     * @return 转换后的对象
     * @throws RuntimeException 如果转换过程中发生异常
     */
    public static <T> T parseObject(String text, TypeReference<T> typeReference) {
        try {
            return objectMapper.readValue(text, typeReference);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 将 JSON 数组字符串转换为 List 对象。
     *
     * @param text  JSON 数组字符串
     * @param clazz List 中对象的类
     * @param <T>   对象类型
     * @return 转换后的 List 对象
     * @throws RuntimeException 如果转换过程中发生异常
     */
    public static <T> List<T> parseArray(String text, Class<T> clazz) {
        if (StringUtils.isEmpty(text)) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(text, objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
