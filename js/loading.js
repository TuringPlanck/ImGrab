function animate {
	$(".circle").children.each(function() {
		$(this).css("background-color","#52cde7");
		$(this).delay(400);
	});
}