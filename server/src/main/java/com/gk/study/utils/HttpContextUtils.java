package com.gk.study.utils;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * HTTP 上下文工具类，用于在 Spring 应用程序中处理 HTTP 相关操作。
 */
public class HttpContextUtils {

    /**
     * 获取当前请求的 HttpServletRequest 对象。
     *
     * @return HttpServletRequest 对象，如果不可用则返回 null
     */
    public static HttpServletRequest getHttpServletRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if(requestAttributes == null){
            return null;
        }
        return ((ServletRequestAttributes) requestAttributes).getRequest();
    }

    /**
     * 获取指定 HttpServletRequest 对象中的请求参数映射。
     *
     * @param request 包含请求参数的 HttpServletRequest 对象
     * @return 表示请求参数的 Map（名称-值对）
     */
    public static Map<String, String> getParameterMap(HttpServletRequest request) {
        Enumeration<String> parameters = request.getParameterNames();

        Map<String, String> params = new HashMap<>();
        while (parameters.hasMoreElements()) {
            String parameter = parameters.nextElement();
            String value = request.getParameter(parameter);
            if (StringUtils.isNotBlank(value)) {
                params.put(parameter, value);
            }
        }

        return params;
    }

    /**
     * 获取当前请求 URL 的域名部分。
     *
     * @return 表示当前请求域名的字符串
     */
    public static String getDomain(){
        HttpServletRequest request = getHttpServletRequest();
        StringBuffer url = request.getRequestURL();
        return url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();
    }

    /**
     * 获取当前 HttpServletRequest 中的 origin 头部信息。
     *
     * @return 表示请求 origin 的字符串
     */
    public static String getOrigin(){
        HttpServletRequest request = getHttpServletRequest();
        return request.getHeader(HttpHeaders.ORIGIN);
    }
}
