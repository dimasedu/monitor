/** -------------------------------------
 * Kuswandi
 * 2019
 * scripts.js
 ** ------------------------------------ */

$(function() {
	$('#btn-edit-pilih').click(function(e) {
		if($('#check').val() == 0) {
			$(':checkbox').each(function() {
				this.checked = true;
			});
			$('#check').val('1');
		} else {
			$(':checkbox').each(function() {
				this.checked = false;
			});
			$('#check').val('0');
		}
	})

	$('#btn-edit-hapus').click(function() {
		$('#modal-hapus').modal('show')
	})

	$('#btn-hapus').click(function() {
		$('#form-hapus').submit();
	})

	$('#form-hapus').submit(function(e) {
		let base = $('#base_url').val();

		e.preventDefault();
		$('#modal-proses').modal('show');
		$.ajax({
			url: base+'/destroy',
			type: 'POST',
			data: $('#form-hapus').serialize(),
			cache: false,
			success(res) {
				let obj = $.parseJSON(res);
				if(obj.status == 1) {
					refresh_table();
					hideLoading();
					$('#modal-hapus').modal('hide');
					notify_success(obj.pesan);
					$('#check').val(0);
				} else {
					hideLoading();
					$('#modal-hapus').modal('hide');
					notify_error(obj.pesan);
				}
			}
		})
	})


})