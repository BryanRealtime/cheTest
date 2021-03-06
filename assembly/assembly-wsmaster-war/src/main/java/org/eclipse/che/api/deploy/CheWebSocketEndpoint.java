/*******************************************************************************
 * Copyright (c) 2012-2017 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 *******************************************************************************/
package org.eclipse.che.api.deploy;

import org.eclipse.che.api.core.websocket.commons.WebSocketMessageReceiver;
import org.eclipse.che.api.core.websocket.impl.BasicWebSocketEndpoint;
import org.eclipse.che.api.core.websocket.impl.GuiceInjectorEndpointConfigurator;
import org.eclipse.che.api.core.websocket.impl.MessagesReSender;
import org.eclipse.che.api.core.websocket.impl.WebSocketSessionRegistry;
import org.eclipse.che.api.core.websocket.impl.WebsocketIdService;

import javax.inject.Inject;
import javax.websocket.server.ServerEndpoint;

/**
 * Implementation of {@link BasicWebSocketEndpoint} for Che packaging.
 * Add only mapping "/websocket".
 */
@ServerEndpoint(value = "/websocket", configurator = GuiceInjectorEndpointConfigurator.class)
public class CheWebSocketEndpoint extends BasicWebSocketEndpoint {
    @Inject
    public CheWebSocketEndpoint(WebSocketSessionRegistry registry,
                                MessagesReSender reSender,
                                WebSocketMessageReceiver receiver,
                                WebsocketIdService websocketIdService) {
        super(registry, reSender, receiver, websocketIdService);
    }

    @Override
    protected String getEndpointId() {
        return "master-websocket-endpoint";
    }
}
