package com.gk.study.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * IP地址工具类，用于获取客户端的真实IP地址。
 */
public class IpUtils {
    private static Logger logger = LoggerFactory.getLogger(IpUtils.class);

    /**
     * 获取客户端真实IP地址。
     *
     * 如果使用Nginx等反向代理软件，不能直接通过request.getRemoteAddr()获取IP地址。
     * 如果存在多级反向代理，X-Forwarded-For头部包含多个IP地址，第一个非unknown的IP地址为真实IP地址。
     *
     * @param request 包含客户端请求信息的HttpServletRequest对象
     * @return 客户端的真实IP地址
     */
    public static String getIpAddr(HttpServletRequest request) {
        String unknown = "unknown";
        String ip = null;
        try {
            ip = request.getHeader("x-forwarded-for");
            if (StringUtils.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("Proxy-Client-IP");
            }
            if (StringUtils.isEmpty(ip) || ip.length() == 0 || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("WL-Proxy-Client-IP");
            }
            if (StringUtils.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_CLIENT_IP");
            }
            if (StringUtils.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            }
            if (StringUtils.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getRemoteAddr();
            }
        } catch (Exception e) {
            logger.error("IPUtils ERROR ", e);
        }

        return ip;
    }

}
