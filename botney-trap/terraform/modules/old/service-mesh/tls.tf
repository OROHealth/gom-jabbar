resource "kubernetes_namespace" "certmanager_namespace" {
  count = var.enable_aws ? 1 : 0
  metadata {
    name = "cert-manager"
  }
}

resource "aws_iam_policy" "cert_manager_policy" {
  count = var.enable_aws ? 1 : 0
  name        = "botney-eks-cert-manager-policy"
  path        = "/"
  description = "Policy, which allows CertManager to create Route53 records"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "route53:GetChange",
        "Resource" : "arn:aws:route53:::change/*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "route53:ChangeResourceRecordSets",
          "route53:ListResourceRecordSets"
        ],
        "Resource" : "arn:aws:route53:::hostedzone/*"
      },
      {
        "Effect": "Allow",
        "Action": "route53:ListHostedZonesByName",
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Resource": "${module.cert_manager_irsa.iam_role_arn}",
        "Action": "sts:AssumeRole"
      }
    ]
  })
}

module "cert_manager_irsa" {
  source                        = "terraform-aws-modules/iam/aws//modules/iam-assumable-role-with-oidc"
  version                       = "4.1.0"
  create_role                   = var.enable_aws
  role_name                     = "botney-eks-cert_manager-irsa"
  provider_url                  = replace(module.eks.cluster_oidc_issuer_url, "https://", "")
  role_policy_arns              = [element(concat(resource.aws_iam_policy.cert_manager_policy[*].arn, [""]), 0)]
  oidc_fully_qualified_subjects = ["system:serviceaccount:cert-manager:cert-manager"]
}

resource "helm_release" "cert-manager" {
  count      = var.enable_aws ? 1 : 0
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  version    = "v1.4.0"
  timeout    = 3600
  namespace  = element(concat(resource.kubernetes_namespace.certmanager_namespace[*].metadata.0.name, [""]), 0)

  set {
    name  = "installCRDs"
    value = true
  }

  set {
    name  = "serviceAccount.create"
    value = true
  }

  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = "${module.cert_manager_irsa.iam_role_arn}"
  }

  set {
    name  = "securityContext.enabled"
    value = true
  }

  set {
    name  = "securityContext.fsGroup"
    value = "1001"
  }

}
