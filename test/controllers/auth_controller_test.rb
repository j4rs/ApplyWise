require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get auth_create_url
    assert_response :success
  end

  test "should get update" do
    get auth_update_url
    assert_response :success
  end
end
