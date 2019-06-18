export const APPLICATION_LOADER_SHOW = 'APPLICATION_LOADER_SHOW';
export const APPLICATION_LOADER_HIDE = 'APPLICATION_LOADER_HIDE';
export const APPLICATION_LOADER_SHOW_WITH_DELAY = 'APPLICATION_LOADER_SHOW_WITH_DELAY';
export const APPLICATION_LOADER_HIDE_WITH_DELAY = 'APPLICATION_LOADER_HIDE_WITH_DELAY';

export const APPLICATION_REDIRECT = 'APPLICATION_REDIRECT';



export interface ApplicationState {
    isShowLoader: boolean;
    lastRedirect: string;
}

const initialState: ApplicationState = {
    isShowLoader: false,
    lastRedirect: '',
};

export function application(state = initialState, action: ApplicationActions): ApplicationState {
    switch (action.type) {
        case APPLICATION_LOADER_SHOW: {
            return {
                ...state,
                isShowLoader: true,
            };
        }

        case APPLICATION_LOADER_HIDE: {
            return {
                ...state,
                isShowLoader: false,
            };
        }

        case APPLICATION_REDIRECT: {
            return {
                ...state,
                lastRedirect: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}




export interface ApplicationLoaderShowAction {
    type: typeof APPLICATION_LOADER_SHOW;
}

export interface ApplicationLoaderHideAction {
    type: typeof APPLICATION_LOADER_HIDE;
}

export interface ApplicationLoaderShowWithDelayAction {
    type: typeof APPLICATION_LOADER_SHOW_WITH_DELAY;
}

export interface ApplicationLoaderHideWithDelayAction {
    type: typeof APPLICATION_LOADER_HIDE_WITH_DELAY;
}

export function loaderShow(): ApplicationLoaderShowWithDelayAction {
    return {
        type: APPLICATION_LOADER_SHOW_WITH_DELAY,
    };
}

export function loaderHide(): ApplicationLoaderHideWithDelayAction {
    return {
        type: APPLICATION_LOADER_HIDE_WITH_DELAY,
    };
}

export interface ApplicationRedirectAction {
    type: typeof APPLICATION_REDIRECT;
    payload: string;
}

export function redirect(url: string): ApplicationRedirectAction {
    return {
        type: APPLICATION_REDIRECT,
        payload: url,
    };
}

export type ApplicationActions = ApplicationLoaderShowAction
    | ApplicationLoaderHideAction
    | ApplicationRedirectAction;
