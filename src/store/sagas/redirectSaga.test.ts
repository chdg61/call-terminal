import {cloneableGenerator} from '@redux-saga/testing-utils';
import {getContext} from 'redux-saga/effects';
import {REDIRECT} from "../../services/utils";
import {redirectPush} from "./redirectSaga";
import {redirect} from "../modules/application";

describe('Test Redirect Saga', () => {
    describe('redirectPush', () => {

        let redirectUrl: Function;
        let get: Function;
        const gen = cloneableGenerator(redirectPush)(redirect('/test'));

        beforeAll(() => {
            redirectUrl = jest.fn(() => {

            });
            get = jest.fn(() => {
                return {
                    redirectUrl
                };
            });
        });

        it('get container', () => {
            expect(gen.next().value).toEqual(getContext('container'));
        });

        it('redirect method', () => {
            expect(gen.next({get}).value).toEqual({redirectUrl});
            expect(get).toBeCalledWith(REDIRECT);
        });

        let redirectGen;
        it('reduce url', () => {
            redirectGen = gen.next({redirectUrl});
            expect(redirectUrl).toBeCalledWith("/test");
        });

        it('end', () => {
            expect(redirectGen.done).toBeTruthy();
        });
    });
});
