import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Lock,
  Unlock,
  Server,
  Globe,
  Database,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

interface AccessRequest {
  id: string;
  user: string;
  resource: string;
  location: string;
  riskScore: number;
  status: 'pending' | 'approved' | 'denied';
  timestamp: Date;
  reason?: string;
}

interface SecurityEvent {
  id: string;
  type: 'threat' | 'access' | 'policy';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

interface NetworkNode {
  id: string;
  name: string;
  type: 'user' | 'server' | 'database' | 'application';
  status: 'secure' | 'compromised' | 'unknown';
  connections: string[];
}

const Simulator = () => {
  const { toast } = useToast();
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [networkNodes] = useState<NetworkNode[]>([
    { id: 'user1', name: 'John Doe', type: 'user', status: 'secure', connections: ['app1'] },
    { id: 'user2', name: 'Jane Smith', type: 'user', status: 'secure', connections: ['db1'] },
    { id: 'user3', name: 'Bob Wilson', type: 'user', status: 'unknown', connections: ['server1'] },
    { id: 'app1', name: 'CRM Application', type: 'application', status: 'secure', connections: ['db1'] },
    { id: 'server1', name: 'File Server', type: 'server', status: 'secure', connections: ['db1'] },
    { id: 'db1', name: 'Customer Database', type: 'database', status: 'secure', connections: [] },
  ]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  useEffect(() => {
    // Simulate incoming access requests
    const interval = setInterval(() => {
      const users = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown', 'Charlie Davis'];
      const resources = ['Customer Database', 'File Server', 'CRM Application', 'HR Portal', 'Finance Dashboard'];
      const locations = ['New York', 'London', 'Tokyo', 'San Francisco', 'Unknown'];
      
      const newRequest: AccessRequest = {
        id: Math.random().toString(36).substr(2, 9),
        user: users[Math.floor(Math.random() * users.length)],
        resource: resources[Math.floor(Math.random() * resources.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        riskScore: Math.floor(Math.random() * 100),
        status: 'pending',
        timestamp: new Date(),
      };

      setAccessRequests(prev => [newRequest, ...prev.slice(0, 9)]);

      // Generate security events
      if (Math.random() > 0.7) {
        const eventTypes = [
          { type: 'threat', message: 'Suspicious login attempt detected', severity: 'high' },
          { type: 'access', message: 'Access granted to sensitive resource', severity: 'medium' },
          { type: 'policy', message: 'Policy violation detected', severity: 'critical' },
        ] as const;

        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const newEvent: SecurityEvent = {
          id: Math.random().toString(36).substr(2, 9),
          ...event,
          timestamp: new Date(),
        };

        setSecurityEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAccessDecision = (requestId: string, decision: 'approved' | 'denied', reason?: string) => {
    setAccessRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: decision, reason }
          : req
      )
    );

    toast({
      title: `Access ${decision}`,
      description: `Request has been ${decision}`,
      variant: decision === 'approved' ? 'default' : 'destructive',
    });
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'server': return Server;
      case 'database': return Database;
      case 'application': return Globe;
      default: return Network;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-success';
      case 'compromised': return 'text-destructive';
      case 'unknown': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'threat';
      case 'high': return 'denied';
      case 'medium': return 'pending';
      case 'low': return 'approved';
      default: return 'pending';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">ZTNA Simulator</h1>
              <p className="text-white/80">Real-time Zero Trust Network Access monitoring and control</p>
            </div>
          </div>
          <StatusBadge variant="secure">
            <Shield className="h-4 w-4 mr-2" />
            System Secure
          </StatusBadge>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="network">Network Map</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last hour</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blocked Attempts</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">7</div>
                  <p className="text-xs text-muted-foreground">-3 from last hour</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">Medium</div>
                  <p className="text-xs text-muted-foreground">Stable trend</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Recent Access Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accessRequests.slice(0, 5).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{request.user}</p>
                          <p className="text-xs text-muted-foreground">{request.resource}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Risk: {request.riskScore}%
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {request.location}
                            </Badge>
                          </div>
                        </div>
                        <StatusBadge 
                          variant={
                            request.status === 'approved' ? 'approved' : 
                            request.status === 'denied' ? 'denied' : 'pending'
                          }
                        >
                          {request.status}
                        </StatusBadge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Security Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                        <div className="mt-1">
                          {event.type === 'threat' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                          {event.type === 'access' && <Eye className="h-4 w-4 text-primary" />}
                          {event.type === 'policy' && <Shield className="h-4 w-4 text-warning" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">{event.message}</p>
                          <div className="flex items-center gap-2">
                            <StatusBadge variant={getSeverityVariant(event.severity)} className="text-xs">
                              {event.severity}
                            </StatusBadge>
                            <span className="text-xs text-muted-foreground">
                              {event.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Network Topology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-8">
                  {networkNodes.map((node) => {
                    const IconComponent = getNodeIcon(node.type);
                    return (
                      <div
                        key={node.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                          selectedNode?.id === node.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border bg-background/50'
                        }`}
                        onClick={() => setSelectedNode(node)}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <IconComponent className={`h-8 w-8 ${getStatusColor(node.status)}`} />
                          <div className="text-center">
                            <p className="text-sm font-medium">{node.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                            <StatusBadge 
                              variant={
                                node.status === 'secure' ? 'approved' : 
                                node.status === 'compromised' ? 'denied' : 'pending'
                              }
                              className="mt-1"
                            >
                              {node.status}
                            </StatusBadge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {selectedNode && (
                  <div className="mt-6 p-4 border rounded-lg bg-background/50">
                    <h4 className="font-medium mb-2">Node Details: {selectedNode.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span> {selectedNode.type}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span> {selectedNode.status}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Connections:</span> {selectedNode.connections.length}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Access Level:</span> Restricted
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Access Control Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg bg-background/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{request.user}</h4>
                          <p className="text-sm text-muted-foreground">
                            Requesting access to {request.resource}
                          </p>
                        </div>
                        <StatusBadge 
                          variant={
                            request.status === 'approved' ? 'approved' : 
                            request.status === 'denied' ? 'denied' : 'pending'
                          }
                        >
                          {request.status}
                        </StatusBadge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Location:</span> {request.location}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Risk Score:</span> 
                          <Badge variant={request.riskScore > 70 ? 'destructive' : request.riskScore > 40 ? 'secondary' : 'default'} className="ml-2">
                            {request.riskScore}%
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time:</span> {request.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleAccessDecision(request.id, 'approved')}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleAccessDecision(request.id, 'denied', 'Policy violation')}
                            className="flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Deny
                          </Button>
                        </div>
                      )}

                      {request.reason && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Reason: {request.reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Security Event Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg bg-background/50">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {event.type === 'threat' && <AlertTriangle className="h-5 w-5 text-destructive" />}
                          {event.type === 'access' && <Eye className="h-5 w-5 text-primary" />}
                          {event.type === 'policy' && <Shield className="h-5 w-5 text-warning" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium capitalize">{event.type} Event</h4>
                            <StatusBadge variant={getSeverityVariant(event.severity)}>
                              {event.severity}
                            </StatusBadge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{event.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Time: {event.timestamp.toLocaleString()}</span>
                            <span>ID: {event.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Simulator;