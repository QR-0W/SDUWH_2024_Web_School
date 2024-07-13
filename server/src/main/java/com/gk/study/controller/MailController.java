    package com.gk.study.controller;
//07新增
import com.gk.study.common.APIResponse;
import com.gk.study.common.ResponeCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import com.gk.study.entity.User;
import com.gk.study.service.UserService;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Resource
    private JavaMailSender javaMailSender;//在spring中配置的邮件发送的bean

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    UserService userService;
    @RequestMapping(value="/send",method= RequestMethod.POST)
    public APIResponse sendMail03(HttpServletRequest request) {
        MimeMessage mMessage = javaMailSender.createMimeMessage();//创建邮件对象
        MimeMessageHelper mMessageHelper;
        String from = "1749051725@qq.com";
        String sendto = request.getParameter("usermail");//这里利用request接受前台数据，接受的收件人地址
        String sendtype = request.getParameter("sendtype");//发送邮箱的目的，如果是 register 注册需要查重
        System.out.println(sendtype+"   "+sendto);

        // 邮箱查重
        if( sendtype.equals("register") && userService.getMailUser(sendto) != null){
            return new APIResponse(ResponeCode.FAIL, "该邮箱已注册");
        }

        try {
            //      生成验证码并发送
            String  captcha = generateCaptcha(4);
            mMessageHelper = new MimeMessageHelper(mMessage, true);
            mMessageHelper.setFrom(from);//发件人邮箱
            mMessageHelper.setTo(sendto);//收件人邮箱
            mMessageHelper.setSubject("家教管理系统验证码");//邮件的主题
            mMessageHelper.setText("验证码："+captcha+" 60秒有效");//邮件的文本内容，true表示文本以html格式打开
            javaMailSender.send(mMessage);//发送邮件
            redisTemplate.boundValueOps(sendto).set(captcha,1, TimeUnit.MINUTES);
        } catch (MessagingException e) {
            e.printStackTrace();
            return new APIResponse(ResponeCode.FAIL,"发送出错");
        }
        return new APIResponse(ResponeCode.SUCCESS,"已成功发送");
    }
    @RequestMapping(value="/verify",method= RequestMethod.POST)
    public APIResponse verifyCaptcha(HttpServletRequest request) {

        System.out.println(request.getParameter("usermail"));
        System.out.println(request.getParameter("captcha"));
        String usermail = request.getParameter("usermail");//待验证的用户邮箱
        String captcha = request.getParameter("captcha");//待验证的验证码

        String captchaToveriify = redisTemplate.boundValueOps(usermail).get();
        System.out.println(captchaToveriify);

        if(captchaToveriify == null){
            return new APIResponse(ResponeCode.FAIL,"未发送或已失效");
        }
        else {
            if(captchaToveriify.equals(captcha)){
                System.out.println("验证成功");
                User responseUser = userService.getMailUser(usermail);
                System.out.println(responseUser);
                return new APIResponse(ResponeCode.SUCCESS,"验证成功",responseUser);
            }
            else {
                System.out.println("验证失败");
                return new APIResponse(ResponeCode.FAIL,"验证失败");
            }
        }

//        return new APIResponse(ResponeCode.SUCCESS, "已成功发送", "");
    }


    private static String generateCaptcha(int length) {
        Random random = new Random();
        StringBuilder captcha = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10);
            captcha.append(digit);
        }
        return captcha.toString();
    }


}
