export default {
  data() {
    return {
      carouselList: [
          {imgSrc: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&hs=0&pn=0&spn=0&di=171160&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3612597965%2C1770541226&os=2135393128%2C4106853535&simid=3457153670%2C241090475&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=wallpaper&bdtype=0&oriquery=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&objurl=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201401%2F23%2F095609lsejfi4thjrrwydj.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B4t7t_z%26e3Bv54AzdH3Fu5674_z%26e3Brir%3F451%3Detjopi6jw1%26pt1%3D8clllln&gsm=1&islist=&querylist='},
          {imgSrc: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&hs=0&pn=1&spn=0&di=98450&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=2075903360%2C405209795&os=2774551758%2C3819494158&simid=3487633204%2C413709248&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=wallpaper&bdtype=0&oriquery=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&objurl=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201310%2F19%2F235356fyjkkugokokczyo0.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B4t7t_z%26e3Bv54AzdH3Fu5674_z%26e3Brir%3F451%3Detjopi6jw1%26pt1%3D899cdaa%26jxp6w%3Drw2j%25nD9dn%2645ktsj%3Dd&gsm=1&islist=&querylist='},
          {imgSrc: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&hs=0&pn=2&spn=0&di=73260&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=2107577769%2C1753645967&os=2179145796%2C2953194597&simid=4174347152%2C684109510&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=wallpaper&bdtype=0&oriquery=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&objurl=http%3A%2F%2Fimg.app178.com%2Ftu%2F201410%2Fyhrgcry32t4.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bwrr80b_z%26e3Bv54AzdH3Fp7AzdH3Fndmd_d_z%26e3Bip4s&gsm=1&islist=&querylist='},
          {imgSrc: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&hs=0&pn=4&spn=0&di=20790&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3482128345%2C2137456532&os=1798684467%2C4035827759&simid=78811430%2C781322548&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=wallpaper&bdtype=0&oriquery=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&objurl=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201303%2F18%2F233119quyrec7to3ws3rco.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B4t7t_z%26e3Bv54AzdH3Fu5674_z%26e3Brir%3F451%3Detjopi6jw1%26pt1%3D8ac0080%26jxp6w%3Drw2j%25nDm8m%2645ktsj%3Dd&gsm=1&islist=&querylist='},
          {imgSrc: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&hs=0&pn=5&spn=0&di=37180&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=2882417333%2C796297084&os=2409484642%2C3836614559&simid=3427629581%2C538002677&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=wallpaper&bdtype=0&oriquery=%E5%9B%BE%E7%89%87%E5%A3%81%E7%BA%B8&objurl=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201801%2F19%2F143729sxvs4klys69z9fsl.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fkkf_z%26e3B2uwg_z%26e3Bv54AzdH3Fwg165t1-ldan0lm-8-8_z%26e3Bip4s&gsm=1&islist=&querylist='},
      ],
      msgList: [
        { content: 'XXX楼宇入住浙江华为有限公司', name: '张三', time: '2020年8月20日' },
        { content: 'XXX楼宇申通快递公司优惠政策即将到期', name: '张三', time: '2020年8月20日' },
      ],
      announcementList: [
        { content: 'XXX楼宇入住浙江华为有限公司', type: '通知', time: '2020年8月20日' },
        { content: '关于贷款利率调整的公告', type: '公告', time: '2020年8月20日' },
      ],
    }
  },
}
