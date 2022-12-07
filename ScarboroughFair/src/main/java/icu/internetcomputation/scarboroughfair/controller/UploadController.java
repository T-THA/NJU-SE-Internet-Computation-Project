package icu.internetcomputation.scarboroughfair.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.text.SimpleDateFormat;
import icu.internetcomputation.scarboroughfair.entity.Message;
import icu.internetcomputation.scarboroughfair.service.GoodService;
import icu.internetcomputation.scarboroughfair.service.UserService;

import java.io.File;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import java.util.Date;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Controller
@CrossOrigin
public class UploadController {

    // 
    /*
     * TODO: 有个问题，目前商品和用户信息的上传都在这个controller，
     *       但按正常思路应该分别放在GoodController和UserController，
     *       待定
     */

    @Resource
    private GoodService goodService;
    @Resource
    private UserService userService;


    @Value("${file.uploadFolder}")
    private String realBasePath;
    @Value("${file.accessPath}")
    private String accessPath;

    @RequestMapping(path="/tmpupload",method = RequestMethod.GET)
    public String tmpupload(Model model){
        return "tmpupload";
    }
    // 测试接口


    // original 初始的upload上传接口
    @PostMapping(path="/upload")
    @ResponseBody
    public Message upload(@RequestParam(value = "file") MultipartFile fileUpload, Model model){
        return OriginalImgupload(fileUpload);
    }


    /*
     * 商品信息 <<<上传>>> 的接口，包括商品图片，商品名称，商品价格，商品描述
     */
    @PostMapping(path="/GoodUpload")
    @ResponseBody
    public Message GoodUpload(@RequestParam(value = "file") MultipartFile fileUpload, 
    @RequestParam(value = "name") String name, @RequestParam(value = "price") String price,
    @RequestParam(value = "description") String description,Model model){
        String GoodUrl = Imgupload(fileUpload);
        if(GoodUrl == null){
            return new Message(false, "图片好像上传失败了w(ﾟДﾟ)w");
        }
        return goodService.addGood(name, Float.valueOf(price), GoodUrl, description);
    }


    /*
     * 用户个人信息 <<<修改>>> 的接口，包括头像，昵称，个性签名（不包括密码！！！）
     */
    @PostMapping(path="UserUpload")
    @ResponseBody
    public Message UserUpload(@RequestParam(value = "avator") MultipartFile fileUpload,
    @RequestParam(value = "nickname") String name, @RequestParam(value = "saying") String signature,
    @RequestParam(value = "userID") String ID, Model model){
        String avatorUrl = null;
        if(fileUpload != null)
        {
            avatorUrl = Imgupload(fileUpload);
        }
        // if(avatorUrl == null){
        //     return new Message(false, "图片好像上传失败了w(ﾟДﾟ)w");
        // }
        Integer id = Integer.valueOf(ID);
        return userService.editUser(id, avatorUrl, name, signature);
    }



    /*
     * 负责将图片上传至数据库指定路径，并返回一个虚拟路径的Url
     */
    public String Imgupload(MultipartFile fileUpload){
        String fileName = fileUpload.getOriginalFilename();
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        fileName = UUID.randomUUID()+suffixName;
        //获取日期
        Date todayDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String today = dateFormat.format(todayDate);

        //域名访问的相对路径目录，通过浏览器访问的链接（虚拟路径）
        String saveToPath = accessPath + today + "/";

        // 真实的路径，实际储存的目录
        String realPath = realBasePath + today + "/";

        //储存文件的物理路径，建立在本地
        String filepath = realPath + fileName;
        try {
            File f = new File(filepath);
            
            if (!f.getParentFile().exists()) {   //create parent file
                f.getParentFile().mkdirs();
            }

            fileUpload.transferTo(f.getAbsoluteFile());

            return saveToPath+fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /*
     * 初始的Imgupload上传接口，负责将图片保存到数据库指定路径，并返回一个Message
     */
    public Message OriginalImgupload(MultipartFile fileUpload){
        String fileName = fileUpload.getOriginalFilename();
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        fileName = UUID.randomUUID()+suffixName;
        //获取日期
        Date todayDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String today = dateFormat.format(todayDate);
        //域名访问的相对路径目录，通过浏览器访问的链接（虚拟路径）
        String saveToPath = accessPath + today + "/";
        // 真实的路径，实际储存的目录
        String realPath = realBasePath + today + "/";
        //储存文件的物理路径，建立在本地
        String filepath = realPath + fileName;
        try {
            File f = new File(filepath);
            
            if (!f.getParentFile().exists()) {   //create parent file
                f.getParentFile().mkdirs();
            }

            fileUpload.transferTo(f.getAbsoluteFile());

            return new Message(true,"好耶，图片上传成功ヽ(✿ﾟ▽ﾟ)/", saveToPath+fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return new Message(false,"图片好像上传失败了w(ﾟДﾟ)w",null);
        }
    }


    // 地址映射配置
    @Configuration
    public class UploadConfig implements WebMvcConfigurer{
        @Value("${file.staticAccessPath}")
        private String staticAccessPath;

        @Value("${file.uploadFolder}")
        private String uploadFolder;

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry)
        {
            registry.addResourceHandler(staticAccessPath).addResourceLocations("file:" + uploadFolder);
        }
    }


}