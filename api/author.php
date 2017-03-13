<?php


	$recUrl = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	$allUrl = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	// 推荐
	$recResult = file_get_contents($recUrl);
	
	// 全部
	$allResult = file_get_contents($allUrl);

	// echo $recResult; // json {}

	// echo $allResult; // json {}

	// {}{} 不是json

	// [{},{}]

	// 解析json字符为php的数组或者对象
	$recResult = json_decode($recResult, true);
	$allResult = json_decode($allResult, true);

	// var_dump($allResult);

	// var all = [1, 2, 3];
	// var rec = ['a', 'b', 'c'];

	// arr = [all, rec];

	// 可以重新构造一个数组
	echo json_encode(array('rec'=>$recResult, 'all'=>$allResult));

?>