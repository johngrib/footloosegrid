// https://qunitjs.com/

function unit_test () {
  
  $('#btn_load2').click();

  QUnit.test( "scheme check", function( assert ) {
    assert.ok( _.isArray(f.scheme) ,"Passed!" );
  });

  QUnit.test( "data array check", function( assert ) {
    assert.ok( _.isArray(f.data) ,"Passed!" );
  });

}