import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { LocalStorageStub } from 'src/app/testing/local-storage-stub';

fdescribe('TokenService', () => {

  const authTokenKey = 'auth_token';
  const refreshTokenKey = 'refresh_token';
  const fakeToken = 'fake-jwt';

  let tokenService: TokenService;
  let localStorageStub: LocalStorageStub = new LocalStorageStub();

  let setAuthTokenSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        TokenService,
      ]
  });
  tokenService = TestBed.get(TokenService);
  setAuthTokenSpy = spyOn(localStorage, 'setItem').and.callFake(localStorageStub.setItem);
});

  fit('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  fit('should set authorization token', () => {
    tokenService.setAuthToken(fakeToken);
    expect(setAuthTokenSpy).toHaveBeenCalledWith(authTokenKey, fakeToken);
  });

  fit('should set refresh token', () => {
    tokenService.setRefreshToken(fakeToken);
    expect(setAuthTokenSpy).toHaveBeenCalledWith(refreshTokenKey, fakeToken);
  });

  fit('should get authorization token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(fakeToken);
    expect(tokenService.getAuthToken()).toBe(fakeToken);
  });

  fit('should clean tokens', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');
    tokenService.clean();
    const itemsRemoved = removeItemSpy.calls.allArgs();
    expect(itemsRemoved.length).toBe(2);
    expect(itemsRemoved[0]).toEqual([authTokenKey]);
    expect(itemsRemoved[1]).toEqual([refreshTokenKey]);
  });

  fit('should get a null expiration date if there is no auth token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(tokenService.getAuthTokenExpiration()).toBeNull();
  });

  fit('should return that the auth-token has expired when the auth-token is expired', () => {
    spyOn(localStorage, 'getItem').and.returnValue(fakeToken);
    spyOn(tokenService.JwtHelper, 'isTokenExpired').and.returnValue(true);
    expect(tokenService.isAuthTokenExpired()).toBe(true);
  });

  fit('should return that the auth-token has not expired when the auth-token is not expired', () => {
    spyOn(localStorage, 'getItem').and.returnValue(fakeToken);
    spyOn(tokenService.JwtHelper, 'isTokenExpired').and.returnValue(false);
    expect(tokenService.isAuthTokenExpired()).toBe(false);
  });

  fit('should return false when token is not expirate ', () => {
    spyOn(tokenService.JwtHelper, 'isTokenExpired').and.returnValue(false);
    expect(tokenService.isTokenExpired(fakeToken)).toBe(false);
  });

  fit('should return true when token is expirate ', () => {
    spyOn(tokenService.JwtHelper, 'isTokenExpired').and.returnValue(true);
    expect(tokenService.isTokenExpired(fakeToken)).toBe(true);
  });

});
