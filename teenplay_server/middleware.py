from django.shortcuts import redirect

from club.models import Club


def pre_handle_request(get_response):
    def middleware(request):
        # 사용자가 요청한 경로
        uri = request.get_full_path()

        if 'accounts' not in uri and 'oauth' not in uri:
            if 'join' not in uri and 'login' not in uri and uri != '/' and 'terms' not in uri \
                    and 'company' not in uri and 'api' not in uri and 'static' not in uri and 'club/intro' not in uri\
                    and 'notice' not in uri and 'festival' not in uri and 'pr-post-list-detail' not in uri \
                    and 'pr-post-list' not in uri and 'teenplay' not in uri and 'admin' not in uri:
                if request.session.get('member') is None:
                    request.session['previous_uri'] = uri
                    return redirect('/member/login')

            if request.user_agent.is_mobile:
                if 'mobile' not in uri:
                    uri = f'/mobile{uri}'
                    return redirect(uri)

            else:
                if 'mobile' in uri:
                    uri = uri.replace('/mobile', '')
                    return redirect(uri)

        response = get_response(request)

        return response

    return middleware

